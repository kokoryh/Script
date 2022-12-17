/*
B站装扮diy
版本：1.7.3
脚本兼容: Quantumult X
作者：@kokoryh

脚本仅供自用，禁转载，禁公开分享，B站随时可以修复，修复了大家都没得用
任何分享或转载行为被发现后此脚本将从库中删除

说明：
1、打开粉色B站-我的-个性装扮，选择喜欢的装扮进入装扮详情页，如果通知获取装扮信息成功，则可以使用本脚本
2、更换新的装扮需要退后台重新打开app，重复两次
3、如果不想提取加载动画，可在boxjs中将『不提取加载动画』开关打开
4、如果装扮有多套主题，可在boxjs中填入『使用第几套主题』，加载动画同理
5、如果想追加其他装扮，可在boxjs中将『装扮追加』开关打开
6、粉色B站和白色B站均可使用本脚本
7、如果只想让白色B站使用本脚本，而粉色B站不使用，可在boxjs中将『对粉色B站不生效』开关打开
8、diy请自行下载需要的装扮，将素材拼合为规范的zip包上传，然后自行编写规范的配置填入boxjs。仅适合有一定编程基础的人，小白请放弃此功能
   配置格式和各配置项含义请『自行体会』，作为挡住小白的门槛
9、空间头图和头像框均可以替换，但由于我用不到，因此不会实现此功能。有需要请自行实现
10、引用请自行去掉前面的#号，用解析器解析的都给我滚

----------------
获取装扮信息(获取完即可关闭此重写)
[rewrite_local]
# ^https:\/\/api\.bilibili\.com\/x\/garb\/v2\/mall\/suit\/detail url script-response-body https://raw.githubusercontent.com/kokoryh/Script/master/js/bili-suit-detail.js

[mitm]
hostname = api.bilibili.com

----------------
日常使用
[rewrite_local]
# ^https:\/\/app\.bilibili\.com\/x\/resource\/show\/skin\? url script-response-body https://raw.githubusercontent.com/kokoryh/Script/master/js/bili-suit-diy.js

[mitm]
hostname = app.bilibili.com

----------------
*/
let obj = JSON.parse($response.body);
let type = getType(obj);
let skip_pink = $prefs.valueForKey("bili_skip_pink") === "true";
if (skip_pink && !type) {
    $done();
} else {
    let user_equip = $prefs.valueForKey("bili_user_equip");
    let load_equip = $prefs.valueForKey("bili_load_equip");
    let skin_num = $prefs.valueForKey("bili_skin_num");
    let load_num = $prefs.valueForKey("bili_load_num");
    setEquip(user_equip, skin_num, type, "user_equip");
    setEquip(load_equip, load_num, type, "load_equip");
    $done({body: JSON.stringify(obj)});
}

function setEquip(equip, equip_num, type, param) {
    if (equip) {
        let equip_list = JSON.parse(equip);
        let num = getNum(equip_num, type);
        if (num <= equip_list.length) {
            obj.data[param] = equip_list[num - 1];
        } else {
            obj.data[param] = equip_list[0];
            $notify(`参数设置过大`, "", "请检查BoxJs设置");
        }
    }
}

function getNum(num, type) {
    if (!num) return 1;
    else if (parseInt(num)) return num;
    else return num.split(";")[type + 1].split(":")[1];
}

// 判断是粉色B站还是白色B站, 0为粉色B站, 1为白色B站
function getType(obj) {
    if (obj.data.skin_colors) return 0;
    return 1;
}
