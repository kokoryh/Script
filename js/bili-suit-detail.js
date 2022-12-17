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
const $ = new Env(`B站装扮信息提取`);
if (typeof $response !== 'undefined') {
    let body = $response.body;
    if (body) {
        let data = JSON.parse(body).data;
        let noLoad = $.getdata("bili_no_load") === "true";
        let pushMode = $.getdata("bili_suit_push") === "true";
        let user_equip;
        let load_equip;
        if (pushMode) {
            user_equip = JSON.parse($.getdata("bili_user_equip") || '[]');
            load_equip = JSON.parse($.getdata("bili_load_equip") || '[]');
        } else if (noLoad) {
            user_equip = [];
            load_equip = JSON.parse($.getdata("bili_load_equip") || '[]');
        } else {
            user_equip = [];
            load_equip = [];
        }
        for (const skin of data.suit_items.skin) {
            const new_skin = {
                "id": skin.item_id,
                "name": skin.name,
                "preview": skin.properties.image_preview,
                "ver": parseInt(skin.properties.ver),
                "package_url": skin.properties.package_url,
                "package_md5": skin.properties.package_md5,
                "data": {
                    "color_mode": skin.properties.color_mode || "light",
                    "color": skin.properties.color || "",
                    "color_second_page": skin.properties.color_second_page || "",
                    "side_bg_color": skin.properties.side_bg_color || "",
                    "tail_color": skin.properties.tail_color || "",
                    "tail_color_selected": skin.properties.tail_color_selected || "",
                    "tail_icon_ani": skin.properties.tail_icon_ani === "true",
                    "tail_icon_ani_mode": skin.properties.tail_icon_ani_mode || "once",
                    "head_myself_mp4_play": skin.properties.head_myself_mp4_play || "",
                    "pub_btn_shade_color_top": skin.properties.pub_btn_shade_color_top || "",
                    "pub_btn_shade_color_bottom": skin.properties.pub_btn_shade_color_bottom || "",
                    "pub_btn_plus_color": skin.properties.pub_btn_plus_color || "",
                    "tail_icon_mode": skin.properties.tail_icon_mode || "img"
                }
            };
            pushEquip(user_equip, new_skin);
        }
        if (!noLoad && data.suit_items.loading) {
            for (const load of data.suit_items.loading) {
                const new_load = {
                    "id": load.item_id,
                    "name": load.name,
                    "ver": load.properties.ver,
                    "loading_url": load.properties.loading_url
                };
                pushEquip(load_equip, new_load);
            }
        }
        let success1 = $.setdata(JSON.stringify(user_equip), "bili_user_equip");
        let success2 = false;
        if (!noLoad && data.suit_items.loading?.length) {
            success2 = $.setdata(JSON.stringify(load_equip), "bili_load_equip");
        }

        let skin_num_notice = "";
        let load_num_notice = "";
        if (data.suit_items.skin.length > 1) skin_num_notice = `，该装扮有${data.suit_items.skin.length}套主题，默认使用第1套，可前往boxjs修改`;
        if (data.suit_items.loading?.length > 1) load_num_notice = `\n该装扮有${data.suit_items.loading.length}个加载动画，默认使用第1个，可前往boxjs修改`;

        let load_msg = "";
        if (noLoad) {
            load_msg = "你已设置不提取加载动画";
        } else if (!data.suit_items.loading?.length) {
            load_msg = "当前装扮不含加载动画";
        } else if (!success2) {
            load_msg = "获取加载动画失败 ‼️";
        } else {
            load_msg = "获取加载动画成功 🎉️";
        }

        let push_mode_notice = "\n你已开启装扮追加模式，以下为装扮总览：\n";
        let suit_view = getSuitView(user_equip, load_equip);
        $.setdata(suit_view, "bili_suit_view");

        if (success1 && pushMode) {
            $.msg("获取装扮信息成功 🎉️", load_msg, data.name + skin_num_notice + load_num_notice + push_mode_notice + suit_view);
        } else if (success1) {
            $.msg("获取装扮信息成功 🎉️", load_msg, data.name + skin_num_notice + load_num_notice);
        } else {
            $.msg("获取装扮信息失败 ‼️", load_msg, load_num_notice);
        }
    }
    $.done()
} else {
    let user_equip = JSON.parse($.getdata("bili_user_equip") || '[]');
    let load_equip = JSON.parse($.getdata("bili_load_equip") || '[]');
    let suit_view = getSuitView(user_equip, load_equip);
    console.log(suit_view);
    $.setdata(suit_view, "bili_suit_view");
    $.done();
}

function pushEquip(equip_list, new_equip) {
    let no_repeat = true;
    for (let i = 0; i < equip_list.length; i++) {
        if (equip_list[i].id === new_equip.id) {
            no_repeat = false;
            equip_list[i] = new_equip;
            break;
        }
    }
    if (no_repeat) {
        equip_list.push(new_equip);
    }
}

function getSuitView(user_equip, load_equip) {
    let suit_view = "--------主题编号, 名称, ID--------\n";
    for (let i = 0; i < user_equip.length; i++) {
        suit_view += `${i + 1}, ${user_equip[i].name}, ${user_equip[i].id}\n`;
    }
    suit_view += "--------加载动画编号, 名称, ID--------\n";
    for (let i = 0; i < load_equip.length; i++) {
        suit_view += `${i + 1}, ${load_equip[i].name}, ${load_equip[i].id}\n`;
    }
    suit_view = suit_view.substring(0, suit_view.length - 1);
    return suit_view;
}

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}isStash(){return"undefined"!=typeof $environment&&$environment["stash-version"]}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,n]=i.split("@"),a={url:`http://${n}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),n=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(n);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t&&t.error||"UndefinedError"));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:n}=t,a=s.decode(n,this.encoding);e(null,{status:i,statusCode:r,headers:o,rawBody:n,body:a},a)},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t&&t.error||"UndefinedError"));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:n}=t,a=i.decode(n,this.encoding);e(null,{status:s,statusCode:r,headers:o,rawBody:n,body:a},a)},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}queryStr(t){let e="";for(const s in t){let i=t[s];null!=i&&""!==i&&("object"==typeof i&&(i=JSON.stringify(i)),e+=`${s}=${i}&`)}return e=e.substring(0,e.length-1),e}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),this.isSurge()||this.isQuanX()||this.isLoon()?$done(t):this.isNode()&&process.exit(1)}}(t,e)}
