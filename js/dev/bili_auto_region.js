let $ = nobyda();
let run = EnvInfo();

function EnvInfo() {
    const url = $request.url;
    if (typeof ($response) !== 'undefined') {
        const raw = JSON.parse($response.body || "{}");
        const data = raw.data || raw.result || {};
        const t1 = [data.title, data.series && data.series.series_title, data.season_title]
            .filter(c => /\u5340\uff09/.test(c))[0] || data.title;
        const t2 = raw.code === -404 ? -404 : null;
        SwitchRegion(t1 || t2)
            .then(s => s ? $done({
                status: $.isQuanX ? "HTTP/1.1 307" : 307,
                headers: {
                    Location: url
                },
                body: "{}"
            }) : $done({body: JSON.stringify(raw)}));
    } else {
        const res = {
            url: url.replace(/%20(%E6%B8%AF|%E5%8F%B0|%E4%B8%AD)&/g, '&')
        };
        SwitchRegion(url).then(() => $done(res));
    }
}

async function SwitchRegion(play) {
    const Group = $.read('BiliArea_Policy') || 'Bilibili';  // B站策略组名
    const CN = $.read('BiliArea_CN') || 'DIRECT';           // 直连子策略名
    const TW = $.read('BiliArea_TW') || '台湾节点';          // 台湾子策略名
    const HK = $.read('BiliArea_HK') || '香港节点';          // 香港子策略名
    const DF = $.read('BiliArea_DF') || 'FALLBACK';         // 备用子策略名
    const off = $.read('BiliArea_disabled') || '';          // WiFi 黑名单
    const current = await $.getPolicy(Group);
    const area = (() => {
        let select;
        if (/\u6e2f[\u4e00-\u9fa5]+\u5340|%20%E6%B8%AF&/.test(play)) {
            const test = /\u53f0[\u4e00-\u9fa5]+\u5340/.test(play);
            if (current != HK && (current == TW && test ? 0 : 1)) select = HK;
        } else if (/\u53f0[\u4e00-\u9fa5]+\u5340|%20%E5%8F%B0&/.test(play)) {
            if (current != TW) select = TW;
        } else if (play === -404) {
            if (current != DF) select = DF;
        } else if (current != CN) {
            select = CN;
        }
        if ($.isQuanX && current === 'direct' && select === 'DIRECT') {
            select = null; // avoid loops in some cases  // qx 的 direct 和 proxy 策略应填小写
        }
        return select;
    })()

    if (area && !off.includes($.ssid || undefined)) {
        const change = await $.setPolicy(Group, area);
        const notify = $.read('BiliAreaNotify') === 'true';
        const msg = SwitchStatus(change, current, area);
        if (!notify) {
            $.notify((/^(http|-404)/.test(play) || !play) ? `` : play, ``, msg);
        } else {
            console.log(`${(/^(http|-404)/.test(play) || !play) ? `` : play}\n${msg}`);
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

function nobyda() {
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
    const adapterStatus = (response) => {
        if (!response) return null;
        if (response.status) {
            response["statusCode"] = response.status;
        } else if (response.statusCode) {
            response["status"] = response.statusCode;
        }
        return response;
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
