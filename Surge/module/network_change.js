!(async () => {
    const ssid = $network.wifi.ssid;
    const directMode = {'mode': 'direct'};
    const proxyMode = {'mode': 'proxy'};
    const ruleMode = {'mode': 'rule'};
    if (!ssid) {
        await changeRunningMode(ruleMode);
    } else {
        const directSsid = readSsid('direct_ssid');
        const proxySsid = readSsid('proxy_ssid');
        if (directSsid.includes(ssid)) {
            await changeRunningMode(directMode);
        } else if (proxySsid.includes(ssid)) {
            await changeRunningMode(proxyMode);
        } else {
            await changeRunningMode(ruleMode);
        }
    }
    $done();
})();

function readSsid(key) {
    return ($persistentStore.read(key) || '').split(',');
}

async function changeRunningMode(mode) {
    return new Promise(resolve => {
        $httpAPI('get', '/v1/outbound', null, res => {
            if (res.mode !== mode.mode) {
                $httpAPI('post', '/v1/outbound', mode, res => resolve(res))
            } else {
                resolve(res);
            }
        })
    })
}
