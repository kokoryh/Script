let $ = kokoryh();
SwitchRegion().then(() => $done());

async function SwitchRegion() {
    const group = $.read('Appstore_Policy') || '苹果服务';
    const direct = $.read('Appstore_Direct') || 'DIRECT';
    const proxy = $.read('Appstore_Proxy') || 'PROXY';
    const off = $.read('Appstore_Disabled') || '';
    const current = await $.getPolicy(group);
    const area = (() => {
        let select;
        if (current !== proxy) {
            select = proxy;
        } else {
            select = direct;
        }
        if ($.isQuanX && current === 'direct' && select === 'DIRECT') {
			select = null; //avoid loops in some cases
		}
        return select;
    })()

    if (area && !off.includes($.ssid || undefined)) {
        const change = await $.setPolicy(group, area);
        const notify = $.read('Appstore_Notify') === 'true';
        const msg = SwitchStatus(change, current, area);
        if (!notify) {
            $.notify(`Appstore策略自动切换`, ``, msg);
        } else {
            console.log(msg);
        }
        if (change) {
            return true;
        }
    }
    return false;
}

function SwitchStatus(status, original, newPolicy) {
    if (status && typeof original !== 'number') {
        return `${original}  =>  ${newPolicy}  =>  🟢`;
    } else if (original === 2) {
        return `切换失败, 策略组名未填写或填写有误 ⚠️`
    } else if (original === 3) {
        return `切换失败, 不支持您的VPN应用版本 ⚠️`
    } else if (status === 0) {
        return `切换失败, 子策略名未填写或填写有误 ⚠️`
    } else {
        return `策略切换失败, 未知错误 ⚠️`
    }
}

function kokoryh() {
    const isHTTP = typeof $httpClient != "undefined";
    const isQuanX = typeof $task != "undefined";
    const isSurge = typeof $network != "undefined" && typeof $script != "undefined";
    const ssid = (() => {
        if (isQuanX && typeof ($environment) !== 'undefined') {
            return $environment.ssid;
        }
        if (isSurge && $network.wifi) {
            return $network.wifi.ssid;
        }
    })();
    const notify = (title, subtitle, message) => {
        console.log(`${title}\n${subtitle}\n${message}`);
        if (isQuanX) $notify(title, subtitle, message);
        if (isHTTP) $notification.post(title, subtitle, message);
    }
    const read = (key) => {
        if (isQuanX) return $prefs.valueForKey(key);
        if (isHTTP) return $persistentStore.read(key);
    }
    const getPolicy = (groupName) => {
        if (isSurge) {
            if (typeof ($httpAPI) === 'undefined') return 3;
            return new Promise((resolve) => {
                $httpAPI("GET", "v1/policy_groups/select", {
                    group_name: encodeURIComponent(groupName)
                }, (b) => resolve(b.policy || 2))
            })
        }
        if (isQuanX) {
            if (typeof ($configuration) === 'undefined') return 3;
            return new Promise((resolve) => {
                $configuration.sendMessage({
                    action: "get_policy_state"
                }).then(b => {
                    if (b.ret && b.ret[groupName]) {
                        resolve(b.ret[groupName][1]);
                    } else resolve(2);
                }, () => resolve());
            })
        }
    }
    const setPolicy = (group, policy) => {
        if (isSurge && typeof ($httpAPI) !== 'undefined') {
            return new Promise((resolve) => {
                $httpAPI("POST", "v1/policy_groups/select", {
                    group_name: group,
                    policy: policy
                }, (b) => resolve(!b.error || 0))
            })
        }
        if (isQuanX && typeof ($configuration) !== 'undefined') {
            return new Promise((resolve) => {
                $configuration.sendMessage({
                    action: "set_policy_state",
                    content: {
                        [group]: policy
                    }
                }).then((b) => resolve(!b.error || 0), () => resolve());
            })
        }
    }
    return {
        getPolicy,
        setPolicy,
        isSurge,
        isQuanX,
        notify,
        read,
        ssid
    }
}
