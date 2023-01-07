// var $request.url. = $request['url'];
// var $response.body = $response.body;
// var $request.method = $request['method'];
// const "Serv" = 'Serv';
// const "/a.p" = '/a.p';
// const "/music.pay" = '/music.pay';
// const "/vip/v2/user/vip" = '/vip/v2/user/vip';
// const "/vip/enc/user/vip" = '/vip/enc/user/vip';
// const "/vip/v2/theme" = '/vip/v2/theme';
// const _0x21ada0 = 'Vo4m6X2hTph/vfpPmau8PTT0sFN6JCgzxSLVH/u3sbEt7VniYsVHbRFgOgN+Uvs39rAI7R3C5HVpaSj8tr8U8dLYwYdDCjMILuUorh3z0BiQToiWxudHkcASIPHNrmZHZYC/yv3DP4b89hbzfqU5UUDUqaZpEBZr76sDF2wNPmYjUEFSVCMGyTl1F6j1DBmKJ1Tik0YuG/2UBa/Ilz12a1KneXsNs5x5EE41bXDke7EygIB3I+6SoITZXOLFAFQFZujdI0GzClNglDKtclpUxpjN3uVeJxHLU40FTwNWo3ZDNv8KSdZpYZ5BDEOCyZkifmHlf1wnocX2zTr2xRAM6JhAD2WaSSNQQVJUI5lv72QNZSN43Pj/qdzatHQP4Pp/H1YxyP36rv3qBcnnJy/55YouIczRc3eJjXExRgo54qdyTYRMYoS9GzNn/edR3hSNnMn9PnElBCfZhkL0R5kZ9JBFCM3vNOy7Cnp6RVyAG0GFHv/g2q1yqkJxibyDro5nlnnvHjhZrsOvSvTXI1BBUlQjGoRqqCTDUvHLoiNwWMoKKfxtswWQiXjoQ6mL5dazxjUsbsHzC1N8YNMVtzf8gBryr3nMWS44wyUpi1/0WhGTRW1wsCllO1DB24+ibTFH/yftWN+/apM9vbQAkc/J+aFy/01plK7rsGNwWYYKG0sr6CS8dGQzy0On6aFo07hiU+wjUEFSVCOf/wKzzX5Cn/OLMKeVa1BPDxV5tm39vCrsxIG6T29VHWx8ck93S/nXCm2dHfojuLySZKJ50B1FaN5uFIY+LA1RbO/0sL+CoSJhoNOLibzt75c5dleW+lbwxLAAdBh5AFq4Z1Uj8bPjm5mHcGWQuBAyZIO+ie8wP4yvWwQFf1ENJiNQQVJUIzwCo22cpAtoAzYZWm3XFPfSlov4G15JGaaHL2X5FG5BTeUwwbBiQfwUpcb6oT8dbIKh2SsUZCeJZW43lLI0UIo9u3y1+P4GMtOKEZ7Sx0aQ3ewknthU2tpL0gnykFtiEtKBxcfHjJEen158zVXrbxxC0W35SmaYOOwgAmEMfxwHI1BBUlQjhVUHnBabnJcnmXCICcyUBglrZkXcNLwg91p4889vKFTLlzROHTt20UzjfKWsNK3U8pYgKYXPbQtSzIuRheEEQDFhLvEhIGKaB6yDoacDLJZ0jgFRIKKFBkbK0VE4nIABi1qgQOXvq1sG4QeupjfEWYqMX8EyyqPHrsDiCltAF1wjUEFSVCNybeUusnxJF2zswj8xQtfPiwfDj3TwKWxKXCmkheqHy7/0Qpyc84xWvq+YXktsU97wUZLHrgJmARudJmQNEwAweIdHMafcwreBy731z6kGLojy5TLgTN7XSm5Ar+hgOW+1ZwkWLyrVvaCdO/8/zdYl1w/PQUCs6dw0ThIeahwjpQ==';
if ($request.url.indexOf("Serv") != -1 && $request.method == 'GET') {
    var _0x22c76e = {};
    _0x22c76e.body = '{}';
    $done(_0x22c76e);
}
if ($request.url.indexOf("/a.p") != -1 && $request.method == 'POST') {
    var tmp = $response.body.replace(/"playright":\d+/g, '"playright":1').replace(/"downright":\d+/g, '"downright":1').replace(/"policytype":\d+/g, '"policytype":3').replace(/"policy":\d+/g, '"policy":5');
    var _0xa90fcc = {};
    _0xa90fcc.body = tmp;
    $done(_0xa90fcc);
} else if ($request.url.indexOf("/a.p") != -1 && $request.url.indexOf('getvip') != -1) {
    var obj = JSON.parse($response.body);
    var _0x5c24c6 = {};
    _0x5c24c6['end'] = 0x790e11d00;
    _0x5c24c6['bought_vip'] = 0x1;
    _0x5c24c6['type'] = 0x1;
    _0x5c24c6['period'] = 0x1f;
    _0x5c24c6['bought_vip_end'] = 0x790e11d00;
    obj['packs'] = _0x5c24c6;
    $response.body = JSON.stringify(obj);
    var _0x2326b4 = {};
    _0x2326b4.body = $response.body;
    $done(_0x2326b4);
} else if ($request.url.indexOf("/a.p") != -1 && $request.url.indexOf('advertright') != -1) {
    $done({});
}
if ($request.url.indexOf("/vip/enc/user/vip") != -1 && $request.method == 'GET') {
    var _0x1b6aa2 = {};
    _0x1b6aa2.body = "Vo4m6X2hTph/vfpPmau8PTT0sFN6JCgzxSLVH/u3sbEt7VniYsVHbRFgOgN+Uvs39rAI7R3C5HVpaSj8tr8U8dLYwYdDCjMILuUorh3z0BiQToiWxudHkcASIPHNrmZHZYC/yv3DP4b89hbzfqU5UUDUqaZpEBZr76sDF2wNPmYjUEFSVCMGyTl1F6j1DBmKJ1Tik0YuG/2UBa/Ilz12a1KneXsNs5x5EE41bXDke7EygIB3I+6SoITZXOLFAFQFZujdI0GzClNglDKtclpUxpjN3uVeJxHLU40FTwNWo3ZDNv8KSdZpYZ5BDEOCyZkifmHlf1wnocX2zTr2xRAM6JhAD2WaSSNQQVJUI5lv72QNZSN43Pj/qdzatHQP4Pp/H1YxyP36rv3qBcnnJy/55YouIczRc3eJjXExRgo54qdyTYRMYoS9GzNn/edR3hSNnMn9PnElBCfZhkL0R5kZ9JBFCM3vNOy7Cnp6RVyAG0GFHv/g2q1yqkJxibyDro5nlnnvHjhZrsOvSvTXI1BBUlQjGoRqqCTDUvHLoiNwWMoKKfxtswWQiXjoQ6mL5dazxjUsbsHzC1N8YNMVtzf8gBryr3nMWS44wyUpi1/0WhGTRW1wsCllO1DB24+ibTFH/yftWN+/apM9vbQAkc/J+aFy/01plK7rsGNwWYYKG0sr6CS8dGQzy0On6aFo07hiU+wjUEFSVCOf/wKzzX5Cn/OLMKeVa1BPDxV5tm39vCrsxIG6T29VHWx8ck93S/nXCm2dHfojuLySZKJ50B1FaN5uFIY+LA1RbO/0sL+CoSJhoNOLibzt75c5dleW+lbwxLAAdBh5AFq4Z1Uj8bPjm5mHcGWQuBAyZIO+ie8wP4yvWwQFf1ENJiNQQVJUIzwCo22cpAtoAzYZWm3XFPfSlov4G15JGaaHL2X5FG5BTeUwwbBiQfwUpcb6oT8dbIKh2SsUZCeJZW43lLI0UIo9u3y1+P4GMtOKEZ7Sx0aQ3ewknthU2tpL0gnykFtiEtKBxcfHjJEen158zVXrbxxC0W35SmaYOOwgAmEMfxwHI1BBUlQjhVUHnBabnJcnmXCICcyUBglrZkXcNLwg91p4889vKFTLlzROHTt20UzjfKWsNK3U8pYgKYXPbQtSzIuRheEEQDFhLvEhIGKaB6yDoacDLJZ0jgFRIKKFBkbK0VE4nIABi1qgQOXvq1sG4QeupjfEWYqMX8EyyqPHrsDiCltAF1wjUEFSVCNybeUusnxJF2zswj8xQtfPiwfDj3TwKWxKXCmkheqHy7/0Qpyc84xWvq+YXktsU97wUZLHrgJmARudJmQNEwAweIdHMafcwreBy731z6kGLojy5TLgTN7XSm5Ar+hgOW+1ZwkWLyrVvaCdO/8/zdYl1w/PQUCs6dw0ThIeahwjpQ==";
    ;
    $done(_0x1b6aa2);
}
if ($request.url.indexOf("/vip/v2/user/vip") != -1 && $request.url.indexOf('op=ui') != -1) {
    var obj = JSON.parse($response.body);
    var _0x259d14 = {};
    _0x259d14['vipIcon'] = 'https://image.kuwo.cn/fe/f2d09ac0-b959-404f-86fa-dc65c715c0e96.png';
    _0x259d14['iconJumpUrl'] = 'http://vip1.kuwo.cn/vip/vue/anPay/pay/index.html?pageType=avip&MBOX_WEBCLOSE=1&FULLHASARROW=1';
    _0x259d14['growthValue'] = '21600';
    _0x259d14['vipTag'] = 'VIP6';
    _0x259d14['vipOverSeasExpire'] = '0';
    _0x259d14['time'] = '1659582730304';
    _0x259d14['goSvipPage'] = '1';
    _0x259d14['isNewUser'] = '1';
    _0x259d14['vipmIcon'] = 'https://image.kuwo.cn/fe/34ad47f8-da7f-43e4-abdc-e6c995666368yyb.png';
    _0x259d14['svipIcon'] = 'https://image.kuwo.cn/fe/f2d09ac0-b959-404f-86fa-dc65c715c0e96.png';
    _0x259d14['vipmExpire'] = '32495443200000';
    _0x259d14['biedSong'] = '0';
    _0x259d14['luxuryIcon'] = 'https://image.kuwo.cn/fe/2fae68ff-de2d-4473-bf28-8efc29e44968vip.png';
    _0x259d14['userType'] = '3';
    _0x259d14['isYearUser'] = '2';
    _0x259d14['vip3Expire'] = '0';
    _0x259d14['experienceExpire'] = '0';
    _0x259d14['luxAutoPayUser'] = '2';
    _0x259d14['biedAlbum'] = '1';
    _0x259d14['vipLuxuryExpire'] = '32495443200000';
    _0x259d14['vipmAutoPayUser'] = '2';
    _0x259d14['svipAutoPayUser'] = '2';
    _0x259d14['vipExpire'] = '32495443200000';
    _0x259d14['svipExpire'] = '32495443200000';
    obj['data'] = _0x259d14;
    $response.body = JSON.stringify(obj);
    var _0x1ce790 = {};
    _0x1ce790.body = $response.body;
    $done(_0x1ce790);
} else if ($request.url.indexOf("/vip/v2/user/vip") != -1 && $request.url.indexOf('jsonpcallback') != -1) {
    $done({});
}
if ($request.url.indexOf("/music.pay") != -1 && $request.method == 'POST') {
    if ($response.bodyindexOf('audio') != -1) {
        var obj = JSON.parse($response.body);
        var _0x507dcb = obj['songs'][0]['id'];
        var _0x20bb38 = obj['songs'][0]['audio'][0]['pid'];
        var _0x5392b0 = obj['songs'][0]['audio'][0]['price'];
        var _0x274ae8 = obj['songs'][0]['audio'][0]['policy'];
        var _0x108023 = _0x274ae8 + '_1';
        var _0x20d61f = obj['songs'][0]['audio']['length'];
        for (var _0x2644a8 = 0x0; _0x2644a8 < _0x20d61f; _0x2644a8++) {
            obj['songs'][0]['audio'][_0x2644a8]['st'] = 0x0;
        }
        var _0x2dd3e8 = obj['songs'][0];
        var _0x27cbb9 = {};
        _0x27cbb9['pid'] = _0x20bb38;
        _0x27cbb9['type'] = _0x274ae8;
        _0x27cbb9['name'] = _0x108023;
        _0x27cbb9['categray'] = _0x108023;
        _0x27cbb9['id'] = _0x507dcb;
        _0x27cbb9['order'] = 0x1666118f;
        _0x27cbb9['final'] = [];
        _0x27cbb9['buy'] = 0x62ca4da9;
        _0x27cbb9['begin'] = 0x62ca4da9;
        _0x27cbb9['end'] = 0xf92a65a9;
        _0x27cbb9['CurEnd'] = 0x0;
        _0x27cbb9['playCnt'] = 0x0;
        _0x27cbb9['playUpper'] = 0x12c;
        _0x27cbb9['downCnt'] = 0x0;
        _0x27cbb9['downUpper'] = 0x12c;
        _0x27cbb9['playVideoCnt'] = 0x0;
        _0x27cbb9['playVideoUpper'] = 0xbb8;
        _0x27cbb9['downVideoCnt'] = 0x0;
        _0x27cbb9['downVideoUpper'] = 0xbb8;
        _0x27cbb9['price'] = _0x5392b0;
        _0x27cbb9['period'] = 0x3e8;
        _0x27cbb9['feetype'] = 0x0;
        _0x27cbb9['info'] = _0x2dd3e8;
        obj['user'] = [_0x27cbb9];
        var _0x575fea = {};
        _0x575fea.body = JSON.stringify(obj);
        $done(_0x575fea);
    } else {
        $done({});
    }
} else if ($request.url.indexOf("/music.pay") != -1 && $request.method == 'GET') {
    $done({});
}
if ($request.url.indexOf("/vip/v2/theme") != -1 && $request.url.indexOf('op=gd') != -1) {
    var obj = JSON.parse($response.body);
    obj['data']['needBieds'] = null;
    var _0x5525a6 = {};
    _0x5525a6.body = JSON.stringify(obj);
    $done(_0x5525a6);
}
