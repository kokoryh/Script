/*
B站装扮diy
版本：1.8.0
脚本兼容: Quantumult X
作者：@kokoryh

脚本仅供自用，禁转载，禁公开分享，B站随时可以修复，修复了大家都没得用
任何分享或转载行为被发现后此脚本将从库中删除

说明：
1、打开粉色B站-我的-个性装扮，选择喜欢的装扮进入装扮详情页，如果通知获取装扮信息成功，则可以使用本脚本
2、更换新的装扮需要退后台重新打开app，重复2次
3、如果不想提取加载动画，可在boxjs中将『不提取加载动画』开关打开
4、如果想保留原有装扮，可在boxjs中将『装扮追加』开关打开
5、如果有多套主题，可在boxjs中填入『使用第几套主题』，加载动画同理。填写前请仔细阅读该选项下的简介
6、装扮的定时切换请按照定时脚本的要求正确配置
7、粉色B站和白色B站均可使用本脚本
8、diy请自行下载需要的装扮，将素材拼合为规范的zip包上传，然后自行编写规范的配置填入boxjs。仅适合有一定编程基础的人，配置格式和各配置项含义请『自行体会』，作为挡住小白的门槛
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
定时切换脚本(此处cron仅供参考，请自行设置切换的时间)
[task_local]
0 8,20 * * * https://raw.githubusercontent.com/kokoryh/Script/master/js/bili-suit-change.js, tag=装扮定时切换, img-url=https://raw.githubusercontent.com/NobyDa/mini/master/Color/bilibili.png, enabled=true
----------------
*/
let body = $response.body;
if (body) {
    var obj = JSON.parse(body);
    let type = getType(obj);
    let user_equip = $prefs.valueForKey("bili_user_equip");
    let load_equip = $prefs.valueForKey("bili_load_equip");
    let skin_num = $prefs.valueForKey("bili_skin_num");
    let load_num = $prefs.valueForKey("bili_load_num");
    setEquip(user_equip, skin_num, type, "user_equip");
    setEquip(load_equip, load_num, type, "load_equip");
    $done({body: JSON.stringify(obj)});
} else {
    $done();
}

function setEquip(equip, equip_num, type, param) {
    if (equip) {
        let equip_list = JSON.parse(equip);
        let num = getNum(equip_num, type);
        if (num === "0") {}
        else if (num <= equip_list.length) {
            obj.data[param] = equip_list[num - 1];
        } else {
            obj.data[param] = equip_list[0];
            $notify("B站装扮DIY", "", "参数设置过大，请检查BoxJs设置");
        }
    }
}

function getNum(num, type) {
    if (!num) return 1;
    else if (parseInt(num) >= 0) return num;
    else if (/([;；]\d+(:\d+)?){2}/.test(num)) return num.split(/;|；/)[type + 1].split(":")[0];
    else {
        $notify("B站装扮DIY", "", "参数格式非法，请检查BoxJs设置");
        return 1;
    }
}

function getType(obj) {
    if (obj.data.skin_colors) return 0;
    return 1;
}
