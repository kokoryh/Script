/***********************************************
 > 应用名称：墨鱼自用B站去广告脚本
 > 脚本作者：@ddgksf2013
 > 微信账号：墨鱼手记
 > 更新时间：2023-01-17
 > 通知频道：https://t.me/ddgksf2021
 > 贡献投稿：https://t.me/ddgksf2013_bot
 > 问题反馈：ddgksf2013@163.com
 > 特别提醒：如需转载请注明出处，谢谢合作！
 ***********************************************/




const version = 'V2.0.103';

let body = $response.body;
if (body) {
    switch (!0) {
        case/^https:\/\/app\.bilibili\.com\/x\/v2\/feed\/index\?/.test($request.url):
            try {
                let t = JSON.parse(body), i = [];
                for (let a of t.data.items) if (!a.hasOwnProperty("banner_item")) {
                    if (!(!a.hasOwnProperty("ad_info") && -1 === a.card_goto?.indexOf("ad") && ["small_cover_v2", "large_cover_v1", "large_cover_single_v9"].includes(a.card_type))) continue; else i.push(a)
                }
                t.data.items = i, body = JSON.stringify(t)
            } catch (e) {
                console.log("bilibili index:" + e)
            }
            break;
        case/^https?:\/\/app\.bilibili\.com\/x\/v2\/feed\/index\/story\?/.test($request.url):
            try {
                let s = JSON.parse(body), l = [];
                for (let d of s.data.items) d.hasOwnProperty("ad_info") || -1 !== d.card_goto.indexOf("ad") || l.push(d);
                s.data.items = l, body = JSON.stringify(s)
            } catch (o) {
                console.log("bilibili Story:" + o)
            }
            break;
        case/^https?:\/\/app\.bilibili\.com\/x\/v\d\/account\/teenagers\/status\?/.test($request.url):
            try {
                let r = JSON.parse(body);
                r.data.teenagers_status = 0, body = JSON.stringify(r)
            } catch (b) {
                console.log("bilibili teenagers:" + b)
            }
            break;
        case/^https?:\/\/app\.bilibili\.com\/x\/resource\/show\/tab/.test($request.url):
            try {
                let p = new Set([177, 178, 179, 181, 102, 104, 106, 486, 488, 489]), c = JSON.parse(body);
                if (c.data?.tab && (c.data.tab = [{
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
                }, {
                    id: 151,
                    name: "影视",
                    uri: "bilibili://pgc/cinema-tab",
                    tab_id: "film",
                    pos: 5
                }]), c.data.top && (c.data.top = [{
                    id: 481,
                    icon: "http://i0.hdslb.com/bfs/archive/d43047538e72c9ed8fd8e4e34415fbe3a4f632cb.png",
                    name: "消息",
                    uri: "bilibili://link/im_home",
                    tab_id: "消息Top",
                    pos: 1
                }]), c.data.bottom) {
                    let n = c.data.bottom.filter(t => p.has(t.id));
                    c.data.bottom = n
                }
                body = JSON.stringify(c)
            } catch (y) {
                console.log("bilibili tab processing:" + y)
            }
            break;
        case/^https?:\/\/app\.bilibili\.com\/x\/v2\/account\/mine/.test($request.url):
            try {
                let u = JSON.parse(body),
                    f = new Set([396, 397, 398, 399, 407, 410, 402, 404, 425, 426, 427, 428, 430, 432, 433, 434, 494, 495, 496, 497, 500, 501]);
                u.data.sections_v2.forEach((t, i) => {
                    let a = t.items.filter(t => f.has(t.id));
                    u.data.sections_v2[i].items = a, u.data.sections_v2[i].button = {}, delete u.data.sections_v2[i].be_up_title, delete u.data.sections_v2[i].tip_icon, delete u.data.sections_v2[i].tip_title, "创作中心" == u.data.sections_v2[i].title && (delete u.data.sections_v2[i].title, delete u.data.sections_v2[i].type)
                }), delete u.data.vip_section_v2, delete u.data.vip_section, u.data.hasOwnProperty("live_tip") && (u.data.live_tip = {}), u.data.hasOwnProperty("answer") && (u.data.answer = {}), u.data.vip_type = 2, u.data.vip.type = 2, u.data.vip.status = 1, u.data.vip.vip_pay_type = 1, u.data.vip.due_date = 4669824160, body = JSON.stringify(u)
            } catch (h) {
                console.log("bilibili mypage:" + h)
            }
            break;
        case/^https?:\/\/api\.live\.bilibili\.com\/xlive\/app-room\/v1\/index\/getInfoByRoom/.test($request.url):
            try {
                let m = JSON.parse(body);
                m.data.activity_banner_info = null, body = JSON.stringify(m)
            } catch (v) {
                console.log("bilibili live broadcast:" + v)
            }
            break;
        case/^https?:\/\/app\.bilibili\.com\/x\/resource\/top\/activity/.test($request.url):
            try {
                let g = JSON.parse(body);
                g.data && (g.data.hash = "ddgksf2013", g.data.online.icon = ""), body = JSON.stringify(g)
            } catch (_) {
                console.log("bilibili right corner:" + _)
            }
            break;
        case/^https?:\/\/app\.bilibili\.com\/x\/v2\/search\/square/.test($request.url):
            try {
                let $ = JSON.parse(body);
                $.data = {type: "history", title: "搜索历史", search_hotword_revision: 2}, body = JSON.stringify($)
            } catch (x) {
                console.log("bilibili hot search:" + x)
            }
            break;
        case/https?:\/\/app\.bilibili\.com\/x\/v2\/account\/myinfo\?/.test($request.url):
            try {
                let k = JSON.parse(body);
                k.data.vip.type = 2, k.data.vip.status = 1, k.data.vip.vip_pay_type = 1, k.data.vip.due_date = 4669824160, body = JSON.stringify(k)
            } catch (w) {
                console.log("bilibili 1080p:" + w)
            }
            break;
        case/pgc\/page\/(bangumi|cinema\/tab\?)/.test($request.url):
            try {
                let O = JSON.parse(body);
                O.result.modules.forEach(t => {
                    t.style.startsWith("banner") && (t.items = t.items.filter(t => -1 != t.link.indexOf("play"))), t.style.startsWith("function") && (t.items = t.items.filter(t => -1 == t.blink.indexOf("www.bilibili.com")), [1283, 241, 1441, 1284].includes(t.module_id) && (t.items = [])), t.style.startsWith("tip") && (t.items = [])
                }), body = JSON.stringify(O)
            } catch (P) {
                console.log("bilibili fanju:" + P)
            }
            break;
        case/^https:\/\/app\.bilibili\.com\/x\/v2\/splash\/list/.test($request.url):
            try {
                let W = JSON.parse(body);
                if (W.data && W.data.list) for (let E of W.data.list) E.duration = 0, E.begin_time = 2240150400, E.end_time = 2240150400;
                body = JSON.stringify(W)
            } catch (j) {
                console.log("bilibili openad:" + j)
            }
            break;
        case/^https:\/\/api\.live\.bilibili\.com\/xlive\/app-interface\/v2\/index\/feed/.test($request.url):
            try {
                let q = JSON.parse(body);
                q.data && q.data.card_list && (q.data.card_list = q.data.card_list.filter(t => "banner_v1" != t.card_type)), body = JSON.stringify(q)
            } catch (B) {
                console.log("bilibili xlive:" + B)
            }
            break;
        default:
            $done({})
    }
    $done({body})
} else $done({});
