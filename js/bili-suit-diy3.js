// 7:00~17:59 第一套装扮 | 18:00~21:59 第二套装扮 | 22:00~6:59 第三套装扮
var obj = JSON.parse($response.body);
var user_equip = $prefs.valueForKey("bili_user_equip");
var load_equip = $prefs.valueForKey("bili_load_equip");
var skin_num = 0;
var load_num = 0;
var hour = new Date().getHours();
if (hour >= 22 || hour < 7) {
    skin_num = 2;
    load_num = 1;
} else if (hour >= 18 && hour < 22) {
    skin_num = 1;
    load_num = 1;
}
if (user_equip) obj.data["user_equip"] = JSON.parse(user_equip)[skin_num];
if (load_equip) obj.data["load_equip"] = JSON.parse(load_equip)[load_num];
$done({body: JSON.stringify(obj)});