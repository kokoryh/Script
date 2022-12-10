// 版本：1.7.0
var obj = JSON.parse($response.body);
if (!obj.data.skin_colors) {
    var user_equip = $prefs.valueForKey("bili_user_equip");
    var load_equip = $prefs.valueForKey("bili_load_equip");
    if(user_equip) {
        user_equip = JSON.parse(user_equip);
        if (user_equip.length === 1) obj.data["user_equip"] = user_equip[0];
        else {
            var skin_num = parseInt($prefs.valueForKey("bili_skin_num") || 1);
            if (skin_num > user_equip.length) {
                obj.data["user_equip"] = user_equip[0];
                $prefs.setValueForKey("1", "bili_skin_num");
                $notify("bili_skin_num参数设置过大", "", "转为使用第1套主题，bili_skin_num已重置为1");
            } else {
                obj.data["user_equip"] = user_equip[skin_num - 1];
            }
        }
    }
    if(load_equip) {
        load_equip = JSON.parse(load_equip);
        if (load_equip.length === 1) obj.data["load_equip"] = load_equip[0];
        else {
            var load_num = parseInt($prefs.valueForKey("bili_load_num") || 1);
            if (load_num > load_equip.length) {
                obj.data["load_equip"] = load_equip[0];
                $prefs.setValueForKey("1", "bili_load_num");
                $notify("bili_load_num参数设置过大", "", "转为使用第1个加载动画，bili_load_num已重置为1");
            } else {
                obj.data["load_equip"] = load_equip[load_num - 1];
            }
        }
    }
    $done({body: JSON.stringify(obj)});
}else {
    $done();
}