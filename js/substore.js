function operator(proxies) {
    let reg = new RegExp('^(?=.*(台|TW|🇹🇼))(?!.*(IEPL|IPLC)).*$')
    return proxies.map(p => {
        if (reg.test(JSON.stringify(p))) {
            p.udp = false
        }
        return p;
    });
}
