/***********************************

 > 应用名称：高德地图APP净化
 > 软件版本：12.2.10
 > 脚本作者：ddgksf2013
 > 微信账号：墨鱼手记
 > 更新时间：2023-01-04
 > 脚本版本：V1.0.6
 > 脚本功能：处理开屏、首页下方推广、我的页面推广、搜索框热词、搜索框下方热榜、首页顶部推广、首页左上角gif
 > 通知频道：https://t.me/ddgksf2021
 > 贡献投稿：https://t.me/ddgksf2013_bot
 > 问题反馈：ddgksf2013@163.com
 > 特别提醒：如需转载请注明出处，谢谢合作！
 > 特别说明：⚠️⚠️⚠️
 本脚本仅供学习交流使用，禁止转载、售卖
 ⚠️⚠️⚠️

 使用步骤：

 1、QuantumultX本地添加分流
 host, amdc.m.taobao.com, reject

 2、卸载高德地图APP并重新安装（如果已安装）

 3、在QuantumultX处于运行环境下打开高德地图并登陆

 4、如果QuantumultX未运行就打开高德地图会致使脚本不生效需卸载重新安装（后续解决）

 [rewrite_local]

 # ～ 高德地图☆净化（2023-01-04）@ddgksf2013
 ^https?:\/\/m5\.amap\.com\/ws\/faas\/amap-navigation\/main-page url script-response-body https://github.com/ddgksf2013/Scripts/raw/master/amap.js
 ^https?:\/\/m5\.amap\.com\/ws\/asa\/ads_attribution url reject
 ^https?:\/\/m5\.amap\.com\/ws\/valueadded\/alimama\/splash_screen url script-response-body https://github.com/ddgksf2013/Scripts/raw/master/amap.js
 ^https?:\/\/sns\.amap\.com\/ws\/msgbox\/pull url script-response-body https://github.com/ddgksf2013/Scripts/raw/master/amap.js
 ^https?:\/\/m5\.amap\.com\/ws\/shield\/dsp\/profile\/index\/nodefaas url script-response-body https://github.com/ddgksf2013/Scripts/raw/master/amap.js
 ^https?:\/\/m5\.amap\.com\/ws\/shield\/search\/new_hotword url script-response-body https://github.com/ddgksf2013/Scripts/raw/master/amap.js
 ^https?:\/\/m5\.amap\.com\/ws\/shield\/scene\/recommend url reject-dict
 ^https?:\/\/optimus-ads\.amap\.com\/uploadimg\/\w+\.gif url reject-img

 [mitm]

 hostname=optimus-ads.amap.com, m5.amap.com, sns.amap.com

 ***********************************/












var __encode = 'jsjiami.com', _a = {},
    _0xb483 = ["\x5F\x64\x65\x63\x6F\x64\x65", "\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x6F\x6A\x73\x6F\x6E\x2E\x63\x6F\x6D\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x6F\x62\x66\x75\x73\x63\x61\x74\x6F\x72\x2E\x68\x74\x6D\x6C"];
(function (_0xd642x1) {
    _0xd642x1[_0xb483[0]] = _0xb483[1]
})(_a);
var __Oxf2fb5 = ["\x62\x6F\x64\x79", "\x70\x61\x72\x73\x65", "\x76\x61\x6C\x75\x65\x61\x64\x64\x65\x64\x2F\x61\x6C\x69\x6D\x61\x6D\x61\x2F\x73\x70\x6C\x61\x73\x68\x5F\x73\x63\x72\x65\x65\x6E", "\x69\x6E\x64\x65\x78\x4F\x66", "\x75\x72\x6C", "\x64\x61\x74\x61", "\x61\x64", "\x64\x69\x73\x70\x6C\x61\x79\x5F\x74\x69\x6D\x65", "\x73\x65\x74\x74\x69\x6E\x67", "\x73\x65\x74", "\x73\x74\x61\x72\x74\x5F\x74\x69\x6D\x65", "\x63\x72\x65\x61\x74\x69\x76\x65", "\x65\x6E\x64\x5F\x74\x69\x6D\x65", "\x73\x74\x72\x69\x6E\x67\x69\x66\x79", "\x66\x61\x61\x73\x2F\x61\x6D\x61\x70\x2D\x6E\x61\x76\x69\x67\x61\x74\x69\x6F\x6E\x2F\x6D\x61\x69\x6E\x2D\x70\x61\x67\x65", "\x63\x61\x72\x64\x4C\x69\x73\x74", "\x64\x61\x74\x61\x54\x79\x70\x65", "\x4C\x6F\x67\x69\x6E\x43\x61\x72\x64", "\x66\x69\x6C\x74\x65\x72", "\x76\x61\x6C\x75\x65\x73", "\x70\x72\x6F\x66\x69\x6C\x65\x2F\x69\x6E\x64\x65\x78\x2F\x6E\x6F\x64\x65", "\x74\x69\x70\x44\x61\x74\x61", "\x4D\x79\x4F\x72\x64\x65\x72\x43\x61\x72\x64", "\x47\x64\x52\x65\x63\x6F\x6D\x6D\x65\x6E\x64\x43\x61\x72\x64", "\x6E\x65\x77\x5F\x68\x6F\x74\x77\x6F\x72\x64", "\x68\x65\x61\x64\x65\x72\x5F\x68\x6F\x74\x77\x6F\x72\x64", "\x77\x73\x2F\x6D\x73\x67\x62\x6F\x78\x2F\x70\x75\x6C\x6C", "\x6D\x73\x67\x73", "\x75\x6E\x64\x65\x66\x69\x6E\x65\x64", "\x6C\x6F\x67", "\u5220\u9664", "\u7248\u672C\u53F7\uFF0C\x6A\x73\u4F1A\u5B9A", "\u671F\u5F39\u7A97\uFF0C", "\u8FD8\u8BF7\u652F\u6301\u6211\u4EEC\u7684\u5DE5\u4F5C", "\x6A\x73\x6A\x69\x61", "\x6D\x69\x2E\x63\x6F\x6D"];
var obj = JSON["parse"]($response["body"]);
if ($request["url"]["indexOf"]("valueadded/alimama/splash_screen") != -1) {
    if (obj["data"] && obj["data"]["ad"]) {
        for (let item of obj["data"]["ad"]) {
            item["set"]["setting"]["display_time"] = 0;
            item["creative"][0x0]["start_time"] = 2240150400;
            item["creative"][0x0]["end_time"] = 2240150400
        }
    }
    ;$done({body: JSON["stringify"](obj)})
} else {
    if ($request["url"]["indexOf"]("faas/amap-navigation/main-page") != -1) {
        if (obj["data"] && obj["data"]["cardList"]) {
            obj["data"]["cardList"] = Object["values"](obj["data"]["cardList"])["filter"]((item) => {
                return (item["dataType"] == "LoginCard")
            })
        }
        ;$done({body: JSON["stringify"](obj)})
    } else {
        if ($request["url"]["indexOf"]("profile/index/node") != -1) {
            delete obj["data"]["tipData"];
            if (obj["data"] && obj["data"]["cardList"]) {
                obj["data"]["cardList"] = Object["values"](obj["data"]["cardList"])["filter"]((item) => {
                    return (item["dataType"] == "MyOrderCard" || item["dataType"] == "GdRecommendCard")
                })
            }
            ;$done({body: JSON["stringify"](obj)})
        } else {
            if ($request["url"]["indexOf"]("new_hotword") != -1) {
                if (obj["data"] && obj["data"]["header_hotword"]) {
                    obj["data"]["header_hotword"] = []
                }
                ;$done({body: JSON["stringify"](obj)})
            } else {
                if ($request["url"]["indexOf"]("ws/msgbox/pull") != -1) {
                    if (obj["msgs"]) {
                        obj["msgs"] = []
                    }
                    ;$done({body: JSON["stringify"](obj)})
                } else {
                    $done($response)
                }
            }
        }
    }
}
;(function (_0xdca8x3, _0xdca8x4, _0xdca8x5, _0xdca8x6, _0xdca8x7, _0xdca8x8) {
    _0xdca8x8 = "undefined";
    _0xdca8x6 = function (_0xdca8x9) {
        if (typeof alert !== _0xdca8x8) {
            alert(_0xdca8x9)
        }
        ;
        if (typeof console !== _0xdca8x8) {
            console["log"](_0xdca8x9)
        }
    };
    _0xdca8x5 = function (_0xdca8xa, _0xdca8x3) {
        return _0xdca8xa + _0xdca8x3
    };
    _0xdca8x7 = _0xdca8x5("删除", _0xdca8x5(_0xdca8x5("版本号，js会定", "期弹窗，"), "还请支持我们的工作"));
    try {
        _0xdca8x3 = __encode;
        if (!(typeof _0xdca8x3 !== _0xdca8x8 && _0xdca8x3 === _0xdca8x5("jsjia", "mi.com"))) {
            _0xdca8x6(_0xdca8x7)
        }
    } catch (e) {
        _0xdca8x6(_0xdca8x7)
    }
})({})
