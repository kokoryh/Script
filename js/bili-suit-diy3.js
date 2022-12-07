// 7点到17点 第一套装扮 | 18点到22点 第二套装扮 | 22点到7点 第三套装扮
var obj = JSON.parse($response.body);
var user_equip = $prefs.valueForKey("bili_user_equip");
var load_equip = $prefs.valueForKey("bili_load_equip");
var skin_num = 0;
var hour = new Date().getHours();
if (hour > 6 && hour < 18) skin_num = 0;
else if (hour > 17 && hour < 23) skin_num = 1;
else skin_num = 2;
if (user_equip) {
    var user_equip = JSON.parse(user_equip);
    obj.data["user_equip"] = user_equip[skin_num];
}
if (load_equip) {
    var load_equip = JSON.parse(load_equip);
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