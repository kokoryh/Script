if (typeof $response !== 'undefined') {
    removeAds();
} else {
    removeValue();
}

function removeAds() {
    let obj = JSON.parse($response.body);
    if (obj.materialsList) {
        if (obj.materialsList.length === 1) {
            let train_12306 = $prefs.valueForKey("train_12306");
            if (train_12306) {
                // console.log(obj.materialsList[0].title);
                let arr = train_12306.split(",");
                obj.materialsList[0].filePath = undefined;
                obj.materialsList[0].billId = arr[0];
                obj.materialsList[0].billMaterialsId = arr[1];
                obj.advertParam.skipTime = 1;
            } else {
                if (obj.materialsList[0].title === "铁路e卡通" || obj.materialsList[0].title === "12306订餐") {
                    let train_12306 = obj.materialsList[0].billId + "," + obj.materialsList[0].billMaterialsId;
                    let success = $prefs.setValueForKey(train_12306, "train_12306");
                    if (success) {
                        $notify("12306去广告", "", "获取广告参数成功，退后台重进即可干掉开屏广告");
                    }
                } else {
                    let title = obj.materialsList[0].title;
                    $notify("12306去广告", "", `获取广告参数失败，当前广告为${title}，请重复退后台重进的过程直到获取参数成功`);
                }
            }
        } else if (obj.materialsList.length > 1) {
            obj.materialsList = [{}];
        }
    }
    $done({body: JSON.stringify(obj)});
}

function removeValue() {
    let success = $prefs.removeValueForKey("train_12306");
    if (success) {
        $notify("12306去广告", "", "广告参数已清空，可重新获取参数");
    }
    $done();
}
