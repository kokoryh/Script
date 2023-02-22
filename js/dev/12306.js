/*
12306去广告
脚本兼容: Quantumult X, Surge
作者：@kokoryh
说明：
12306的开屏广告比较特殊，必须在返回的广告有本地缓存时才可修改skipTime跳过
因此单纯修改filePath会使新的广告无法缓存，从而无法跳过
但是不将filePath置为undefined，仅修改skipTime的话会看到一闪而过的开屏广告
经过测试可以将未缓存的广告的billId和billMaterialsId修改为已缓存的广告来跳过
于是可以跳过开屏倒计时且不看到广告的有效期就跟这个缓存的有效时间挂钩，可以得到两种实现思路：
1、修改缓存有效时间，即目前的方法，修改chacheTime。然而这个数据是否生效需要时间的验证(已知改为100不生效，7天过去了缓存依旧生效，等待第15天验证)
2、当确认方法1缓存始终会失效后，就只能在每次缓存失效后重新获取一次缓存，然后在缓存有效期内可以做到一直无开屏广告。缺点：每次缓存失效后会看到一次一闪而过的开屏广告(已实现在handleSplash2()，可随时切换planB)

已有更好的屏蔽方式，此脚本仅留作日后参考用。thx @ddgksf2013
2023年2月21日更新：真没想到这傻逼APP在没开屏广告的情况下依旧有倒计时，通过替换成有广告的数据以跳过开屏
*/

// let $ = kokoryh();

// if (typeof $response !== 'undefined') {
//     removeAds();
// } else {
//     removeValue();
// }

removeAds();

function removeAds() {
    let body;
    let obj = JSON.parse($request.body);
    if (obj.placementNo === "0007") {
        body = '{"materialsList":[{"billMaterialsId":"255","filePath":"h","creativeType":1}],"advertParam":{"skipTime":1}}';
    } else if (obj.placementNo === "G0054") {
        body = '{"code":"00","materialsList":[{}]}';
    } else {
        body = '{"code":"00","message":"无广告返回"}';
    }
    if ('undefined' !== typeof $task) $done({body});
    else $done({response: {body}});
}

function removeAdsOld() {
    let obj = JSON.parse($response.body);
    if (obj.materialsList) {
        if (obj.materialsList.length === 1) {
            // console.log(obj.materialsList[0].title + ", billId: " + obj.materialsList[0].billId + ", billMaterialsId: " + obj.materialsList[0].billMaterialsId);
            handleSplashNew(obj);
        } else if (obj.materialsList.length > 1) {
            obj.materialsList = [{}];
        }
    } else {
        obj = fakeData()
    }
    $done({body: JSON.stringify(obj)});
}

function uuid() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16);
    })
}

function fakeData() {
    return {
        "code": "00",
        "rid": uuid(),
        "materialsList": [{
            "billId": "250",
            "billMaterialsId": "114514",
            "filePath": "null",
            "title": "12306的傻逼程序员",
            "linkUri": "https://mp.weixin.qq.com/s/GuIM1ix0lw_3stdZg0S0bg",
            "linkType": 2,
            "viewUrlList": ["https://ad.12306.cn/ad/mon/mzc?bid=4611&appId=2&mid=6304&pn=0061&n=1&ct=0&cn=CH&reqDate=1670762668338&rid=e2f930654b784e9dad0b804692a2d222&did=E5D2D21C-AEB7-4402-A9D4-391A8FE0C07F&t=1"],
            "clickUrlList": ["https://ad.12306.cn/ad/mon/mzc?bid=4611&appId=2&mid=6304&pn=0061&n=1&ct=0&cn=CH&reqDate=1670762668338&rid=e2f930654b784e9dad0b804692a2d222&did=E5D2D21C-AEB7-4402-A9D4-391A8FE0C07F&t=2"],
            "textDesc": "",
            "dplUrl": "",
            "advNature": 1,
            "pn": "0061",
            "creativeType": 1
        }],
        "advertParam": {
            "skipTime": 0,
            "showSkipBtn": 1,
            "skipTimeAgain": 1,
            "chacheTime": 600000,
            "fixedscreen": 3,
            "isDefault": 0,
            "displayNumDi": 1,
            "index": 2
        }
    }
}

function handleSplashNew(obj) {
    obj.materialsList[0].filePath = "h";
    obj.advertParam.skipTime = 0;
}

function handleSplash(obj) {
    let train_12306 = $.getValue("train_12306");
    if (train_12306) {
        obj.materialsList[0].filePath = undefined;
        setValue(obj);
    } else {
        handleNoTemp(obj);
    }
}

function handleNoTemp(obj) {
    let timestamp = new Date().getTime();
    setValue(obj);
    let train_12306 = timestamp + "," + obj.materialsList[0].billId + "," + obj.materialsList[0].billMaterialsId;
    let success = $.setValue(train_12306, "train_12306");
    if (success) {
        // $.notify("12306去广告", "", "参数修改成功，退后台重进即可告别开屏广告");
        console.log("12306去广告 - 参数修改成功，退后台重进即可告别开屏广告");
    }
}

function setValue(obj) {
    obj.materialsList[0].billId = "1000005";
    obj.materialsList[0].billMaterialsId = "2000005";
    // obj.advertParam.chacheTime = 86400 * 365 * 10;
    obj.advertParam.skipTime = 1;
}

function handleSplash2(obj) {
    let timestamp = new Date().getTime();
    let train_12306 = $.getValue("train_12306");
    if (train_12306) {
        let arr = train_12306.split(",");
        if (timestamp - arr[0] < 86400 * 1000 * 7) {  // 缓存有效期，暂时设置为7天，以实际为准
            obj.materialsList[0].filePath = undefined;
            obj.materialsList[0].billId = arr[1];
            obj.materialsList[0].billMaterialsId = arr[2];
            obj.advertParam.skipTime = 1;
        } else {
            handleNoTemp2(obj, timestamp);  // 重新进行缓存
        }
    } else {
        handleNoTemp2(obj, timestamp);
    }
}

function handleNoTemp2(obj, timestamp) {
    obj.advertParam.skipTime = 1;
    let train_12306 = timestamp + "," + obj.materialsList[0].billId + "," + obj.materialsList[0].billMaterialsId;
    let success = $.setValue(train_12306, "train_12306");
    if (success) {
        console.log("12306去广告 - 获取参数成功，在缓存有效期内你不会看到12306的开屏广告");
    }
}

function removeValue() {
    let success = $.setValue("", "train_12306");
    if (success) {
        console.log("12306去广告 - 脚本已更新，无需手动运行");
    }
    $done();
}

function kokoryh() {
    const isQuanX = 'undefined' !== typeof $task;
    const isSurge = 'undefined' !== typeof $httpClient;
    const notify = (title, subtitle, message) => {
        if (isQuanX) $notify(title, subtitle, message);
        if (isSurge) $notification.post(title, subtitle, message);
    }
    const getValue = (key) => {
        if (isQuanX) return $prefs.valueForKey(key);
        if (isSurge) return $persistentStore.read(key);
    }
    const setValue = (val, key) => {
        if (isQuanX) return $prefs.setValueForKey(val, key);
        if (isSurge) return $persistentStore.write(val, key);
    }
    return {
        isQuanX,
        isSurge,
        notify,
        getValue,
        setValue
    }
}
