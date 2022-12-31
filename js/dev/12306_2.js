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
1、修改缓存有效时间，即目前的方法，修改chacheTime。然而这个数据是否生效需要时间的验证(已知改为100不生效，准备先验证不修改时的有效期，在第8天和第15天各测试一次)
2、当确认方法1无法修改缓存有效时间后，就只能在每次缓存失效后重新获取一次缓存，然后在缓存有效期内可以做到一直无开屏广告。缺点：每次缓存失效后会看到一次一闪而过的开屏广告(已实现在12306_2.js)
*/
let $ = kokoryh();

if (typeof $response !== 'undefined') {
    removeAds();
} else {
    removeValue();
}

function removeAds() {
    let obj = JSON.parse($response.body);
    if (obj.materialsList) {
        if (obj.materialsList.length === 1) {
            handleSplash(obj);
        } else if (obj.materialsList.length > 1) {
            obj.materialsList = [{}];
        }
    }
    $done({body: JSON.stringify(obj)});
}

function handleSplash(obj) {
    // console.log(obj.materialsList[0].title + ", billId: " + obj.materialsList[0].billId + ", billMaterialsId: " + obj.materialsList[0].billMaterialsId);
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
            handleNoTemp(obj, timestamp);  // 重新进行缓存
        }
    } else {
        handleNoTemp(obj, timestamp);
    }
}

function handleNoTemp(obj, timestamp) {
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
        console.log("12306去广告 - 参数已清空，可重新获取参数");
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
