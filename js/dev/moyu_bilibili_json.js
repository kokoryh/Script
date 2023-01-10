/***********************************************
 > 应用名称：墨鱼自用B站去广告脚本
 > 脚本作者：@ddgksf2013
 > 微信账号：墨鱼手记
 > 更新时间：2022-01-10
 > 通知频道：https://t.me/ddgksf2021
 > 贡献投稿：https://t.me/ddgksf2013_bot
 > 问题反馈：ddgksf2013@163.com
 > 特别提醒：如需转载请注明出处，谢谢合作！
 ***********************************************/




const version = 'V2.0.87';

let body = $response.body;
if (body) {
    switch (!0) {
        case/^https:\/\/app\.bilibili\.com\/x\/v2\/feed\/index\?/.test($request.url):
            try {
                let t = JSON.parse(body), i = [];
                for (let e of t.data.items) if (!e.hasOwnProperty("banner_item")) {
                    if (e.hasOwnProperty("ad_info") || -1 !== e.card_goto.indexOf("ad") || "small_cover_v2" !== e.card_type && "large_cover_v1" !== e.card_type && "large_cover_single_v9" !== e.card_type) continue; else i.push(e)
                }
                t.data.items = i, body = JSON.stringify(t)
            } catch (a) {
                console.log("bilibili index:" + a)
            }
            break;
        case/^https?:\/\/app\.bilibili\.com\/x\/v2\/feed\/index\/story\?/.test($request.url):
            try {
                let s = JSON.parse(body), l = [];
                for (let o of s.data.items) o.hasOwnProperty("ad_info") || -1 !== o.card_goto.indexOf("ad") || l.push(o);
                s.data.items = l, body = JSON.stringify(s)
            } catch (r) {
                console.log("bilibili Story:" + r)
            }
            break;
        case/^https?:\/\/app\.bilibili\.com\/x\/v\d\/account\/teenagers\/status\?/.test($request.url):
            try {
                let d = JSON.parse(body);
                d.data.teenagers_status = 0, body = JSON.stringify(d)
            } catch (b) {
                console.log("bilibili teenagers:" + b)
            }
            break;
        case/^https?:\/\/app\.bilibili\.com\/x\/resource\/show\/tab/.test($request.url):
            try {
                let p = new Set([176, 107]), c = new Set([177, 178, 179, 181, 102, 104, 106, 486, 488, 489]),
                    n = JSON.parse(body);
                if (n.data?.tab && (n.data.tab = [{
                    id: 39,
                    name: "直播",
                    uri: "bilibili://live/home",
                    tab_id: "直播tab",
                    pos: 1
                }, {
                    id: 40,
                    name: "推荐",
                    uri: "bilibili://pegasus/promo",
                    tab_id: "推荐tab",
                    pos: 2,
                    default_selected: 1
                }, {id: 41, name: "热门", uri: "bilibili://pegasus/hottopic", tab_id: "hottopic", pos: 3}, {
                    id: 545,
                    name: "番剧",
                    uri: "bilibili://pgc/home",
                    tab_id: "bangumi",
                    pos: 4
                }, {id: 151, name: "影视", uri: "bilibili://pgc/cinema-tab", tab_id: "film", pos: 5}]), n.data.top) {
                    let y = n.data.top.filter(t => p.has(t.id));
                    n.data.top = y
                }
                if (n.data.bottom) {
                    let h = n.data.bottom.filter(t => c.has(t.id));
                    n.data.bottom = h
                }
                body = JSON.stringify(n)
            } catch (m) {
                console.log("bilibili tab processing:" + m)
            }
            break;
        case/^https?:\/\/app\.bilibili\.com\/x\/v2\/account\/mine/.test($request.url):
            try {
                let f = JSON.parse(body),
                    u = new Set([396, 397, 398, 399, 402, 404, 407, 410, 425, 426, 427, 428, 430, 432, 433, 434, 494, 495, 496, 497, 500, 501]);
                f.data.sections_v2.forEach((t, i) => {
                    t.items.forEach(t => {
                        622 === t.id && (t.title = "会员购", t.uri = "bilibili://mall/home")
                    });
                    let e = t.items.filter(t => u.has(t.id));
                    f.data.sections_v2[i].items = e, f.data.sections_v2[i].button = {}, delete f.data.sections_v2[i].be_up_title, delete f.data.sections_v2[i].tip_icon, delete f.data.sections_v2[i].tip_title;
                    for (let a = 0; a < f.data.sections_v2.length; a++) ("创作中心" == f.data.sections_v2[a].title || "創作中心" == f.data.sections_v2[a].title) && (delete f.data.sections_v2[a].title, delete f.data.sections_v2[a].type);
                    delete f.data.vip_section_v2, delete f.data.vip_section, f.data.hasOwnProperty("live_tip") && (f.data.live_tip = {}), f.data.hasOwnProperty("answer") && (f.data.answer = {}), f.data.vip_type = 2, f.data.vip.type = 2, f.data.vip.status = 1, f.data.vip.vip_pay_type = 1, f.data.vip.due_date = 4669824160
                }), body = JSON.stringify(f)
            } catch (g) {
                console.log("bilibili mypage:" + g)
            }
            break;
        case/^https?:\/\/api\.live\.bilibili\.com\/xlive\/app-room\/v1\/index\/getInfoByRoom/.test($request.url):
            try {
                let v = JSON.parse(body);
                v.data.activity_banner_info = null, body = JSON.stringify(v)
            } catch (_) {
                console.log("bilibili live broadcast:" + _)
            }
            break;
        case/^https?:\/\/app\.bilibili\.com\/x\/resource\/top\/activity/.test($request.url):
            try {
                let $ = JSON.parse(body);
                $.data && ($.data.hash = "ddgksf2013", $.data.online.icon = ""), body = JSON.stringify($)
            } catch (w) {
                console.log("bilibili right corner:" + w)
            }
            break;
        case/^https?:\/\/app\.bilibili\.com\/x\/v2\/search\/square/.test($request.url):
            try {
                let k = JSON.parse(body);
                k.data = {type: "history", title: "搜索历史", search_hotword_revision: 2}, body = JSON.stringify(k)
            } catch (x) {
                console.log("bilibili hot search:" + x)
            }
            break;
        case/https?:\/\/app\.bilibili\.com\/x\/v2\/account\/myinfo\?/.test($request.url):
            try {
                let O = JSON.parse(body);
                O.data.vip.type = 2, O.data.vip.status = 1, O.data.vip.vip_pay_type = 1, O.data.vip.due_date = 4669824160, body = JSON.stringify(O)
            } catch (P) {
                console.log("bilibili 1080p:" + P)
            }
            break;
        case/pgc\/page\/bangumi/.test($request.url):
            try {
                let W = JSON.parse(body);
                W.result.modules.forEach(t => {
                    t.style.startsWith("banner") && (t.items = t.items.filter(t => -1 != t.link.indexOf("play"))), t.style.startsWith("function") && (t.items = t.items.filter(t => -1 == t.blink.indexOf("www.bilibili.com"))), t.style.startsWith("tip") && (t.items = [])
                }), body = JSON.stringify(W)
            } catch (E) {
                console.log("bilibili fanju:" + E)
            }
            break;
        case/pgc\/page\/cinema\/tab\?/.test($request.url):
            try {
                let q = JSON.parse(body);
                q.result.modules.forEach(t => {
                    t.style.startsWith("banner") && (t.items = t.items.filter(t => -1 != t.link.indexOf("play"))), t.style.startsWith("function") && (t.items = t.items.filter(t => -1 == t.blink.indexOf("www.bilibili.com"))), t.style.startsWith("tip") && (t.items = [])
                }), body = JSON.stringify(q)
            } catch (j) {
                console.log("bilibili video:" + j)
            }
            break;
        case/^https?:\/\/app\.bilibili\.com\/x\/resource\/show\/skin\?/.test($request.url):
            try {
                let B = JSON.parse(body);
                B && B.hasOwnProperty("data") && B.data.hasOwnProperty("common_equip") && B.data.common_equip.hasOwnProperty("package_url"), body = JSON.stringify(B)
            } catch (I) {
                console.log("bilibili skin:" + I)
            }
            break;
        case/^https:\/\/app\.bilibili\.com\/x\/v2\/splash\/list/.test($request.url):
            try {
                let R = JSON.parse(body);
                if (R.data && R.data.list) for (let S of R.data.list) S.duration = 0, S.begin_time = 2240150400, S.end_time = 2240150400;
                body = JSON.stringify(R)
            } catch (z) {
                console.log("bilibili openad:" + z)
            }
            break;
        default:
            $done({})
    }
    $done({body})
} else $done({});
