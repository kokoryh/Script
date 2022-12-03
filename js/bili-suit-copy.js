/*
B站装扮拷贝
版本：1.6
脚本兼容: Quantumult X
作者：@kokoryh

纯自用，禁转载，转载死全家

说明：
打开粉色B站进入装扮详情页，如果通知获取装扮信息成功，则可以使用本脚本
更换装扮需要退后台重新打开app，重复两次
如果不想提取加载动画，可在boxjs中将『不提取加载动画』开关打开
如果装扮有多套主题，可在boxjs中填入『使用第几套主题』，加载动画同理
粉色B站和白色B站均可使用本脚本
如果只想让白色B站使用本脚本，而粉色B站不使用，请使用bili-suit-copy2.js
引用请自行去掉前面的#号，用解析器解析的都给我滚

----------------
获取装扮信息(获取完即可关闭此重写)
[rewrite_local]
# ^https:\/\/api\.bilibili\.com\/x\/garb\/v2\/mall\/suit\/detail url script-response-body https://raw.githubusercontent.com/kokoryh/Script/master/js/bili-suit-detail.js

[mitm]
hostname = api.bilibili.com

----------------
日常使用
[rewrite_local]
# ^https:\/\/app\.bilibili\.com\/x\/resource\/show\/skin\? url script-response-body https://raw.githubusercontent.com/kokoryh/Script/master/js/bili-suit-copy.js

[mitm]
hostname = app.bilibili.com

----------------
*/
var obj = JSON.parse($response.body);
var user_equip = $prefs.valueForKey("bili_user_equip");
var load_equip = $prefs.valueForKey("bili_load_equip");
if(user_equip) {
    var user_equip = JSON.parse(user_equip);
    if (user_equip.length === 1) obj.data["user_equip"] = user_equip[0];
    else obj.data["user_equip"] = user_equip[parseInt($.getdata("bili_skin_num") || 1) - 1];
}
if(load_equip) {
    var load_equip = JSON.parse(load_equip);
    if (load_equip.length === 1) obj.data["load_equip"] = load_equip[0];
    else obj.data["load_equip"] = load_equip[parseInt($.getdata("bili_load_num") || 1) - 1];
}
$done({body: JSON.stringify(obj)});