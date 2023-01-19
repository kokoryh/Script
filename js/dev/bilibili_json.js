var url = $request.url
var change = false
var obj
try {
    obj = JSON.parse($response.body)
} catch (e) {
    console.log(e + "\n错误URL：" + url)
    $done({})
}
if (url.includes('app.bilibili.com/x/v2/splash/list')) {  // 开屏广告
    if (obj.data?.list) {
        for (let item of obj.data.list) {
            item.duration = 0  // 显示时间
            item.begin_time = 2240150400  // 2040 年
            item.end_time = 2240150400
        }
        change = true
    }
} else if (url.includes('app.bilibili.com/x/v2/feed/index?')) {  // 推荐去广告，最后问号不能去掉，以免匹配到story模式
    if (obj.data?.items) {
        obj.data.items = obj.data.items.filter(item => {
            return !item.banner_item
                && !item.ad_info
                && !item.card_goto.includes("ad")
                && ["small_cover_v2", "large_cover_v1", "large_cover_single_v9"].includes(item.card_type)
        })
        change = true
        // let items = []
        // for (let item of obj.data.items) {
        //     if (item.hasOwnProperty("banner_item")) {
        //     } else if (
        //         !item.hasOwnProperty("ad_info")
        //         && item.card_goto.indexOf("ad") === -1
        //         && ["small_cover_v2", "large_cover_v1", "large_cover_single_v9"].includes(item["card_type"])
        //         // && (item["card_type"] === "small_cover_v2" || item["card_type"] === "large_cover_v1" || item["card_type"] === "large_cover_single_v9")
        //     ) {
        //         items.push(item)
        //     }
        // }
        // obj.data.items = items
        // change = true
    }
} else if (url.includes('app.bilibili.com/x/v2/feed/index/story?')) {  // 匹配story模式，用于记录Story的aid
    if (obj.data?.items) {
        obj.data.items = obj.data.items.filter(item => {
            return !item.ad_info
                && !item.card_goto.includes("ad")
        })
        change = true
        // let items = []
        // for (let item of obj.data.items) {
        //     if (!item.hasOwnProperty("ad_info") && item.card_goto.indexOf("ad") === -1) {
        //         items.push(item)
        //     }
        // }
        // obj.data.items = items
        // change = true
    }
} else if (url.includes('app.bilibili.com/x/resource/show/tab')) {  // 标签页处理，如去除会员购等等
    if (obj.data?.tab?.length < 4) {
        obj.data.tab.push({
            "id": 1411,
            "tab_id": "bangumi",
            "name": "动画",
            "uri": "bilibili://following/home_activity_tab/6544",
            "pos": 4
        })
        change = true
    } else {
        // let storyAid = "246834163" // 将 id（222 & 107）调整为Story功能按钮
        // const topList = new Set([176, 107])
        const tabList = new Set([39, 40, 41, 774, 857, 545, 151, 442, 99, 100, 101, 554, 556])
        const bottomList = new Set([177, 178, 179, 181, 102, 104, 106, 486, 488, 489])
        if (obj.data?.tab) {
            obj.data.tab = obj.data.tab.filter((e) => {
                return tabList.has(e.id)
            })
            change = true
        }
        if (obj.data?.top) {
            obj.data.top = [{
                id: 176,
                icon: "http://i0.hdslb.com/bfs/archive/d43047538e72c9ed8fd8e4e34415fbe3a4f632cb.png",
                tab_id: "消息Top",
                name: "消息",
                uri: "bilibili://link/im_home",
                pos: 1
            }]
            change = true
            // obj.data.top = obj.data.top.filter((e) => {
            //     if (e.id === 222 || e.id === 107) {
            //         e.uri = `bilibili://story/${storyAid}`
            //         e.icon = "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/bilibili/bilibili_icon.png"
            //         e.tab_id = "Story_Top"
            //         e.name = "Story"
            //     }
            //     return topList.has(e.id)
            // })
            // change = true
        }
        if (obj.data?.bottom) {
            obj.data.bottom = obj.data.bottom.filter((e) => {
                return bottomList.has(e.id)
            })
            change = true
        }
    }
} else if (url.includes('app.bilibili.com/x/v2/account/mine')) {  // 我的页面处理，去除一些推广按钮
    /*
    哔哩哔哩-我的页面
    标准版：
    396离线缓存 397历史记录 398我的收藏 399稍后再看 171个性装扮 172我的钱包 407联系客服 410设置
    港澳台：
    534离线缓存 8历史记录 4我的收藏 428稍后再看
    352离线缓存 1历史记录 405我的收藏 402个性装扮 404我的钱包 544创作中心
    概念版：
    425离线缓存 426历史记录 427我的收藏 428稍后再看 171创作中心 430我的钱包 431联系客服 432设置
    国际版：
    494离线缓存 495历史记录 496我的收藏 497稍后再看 741我的钱包 742稿件管理 500联系客服 501设置
    622为会员购中心 425开始为概念版id
    */
    if (obj.data?.sections_v2) {
        const itemList = new Set([396, 397, 398, 399, 402, 404, 407, 410, 425, 426, 427, 428, 430, 432, 433, 434, 494, 495, 496, 497, 500, 501])
        obj.data.sections_v2.forEach(element => {
            // element.items.forEach((e) => {
            //     if (e.id === 622) {
            //         e.title = "会员购"
            //         e.uri = "bilibili://mall/home"
            //     }
            // })
            if (["创作中心", "創作中心"].includes(element.title)) {
                element.title = undefined
                element.type = undefined
            }
            element.items = element.items.filter(e => {
                return itemList.has(e.id)
            })
            element.button = {}
            element.be_up_title = undefined
            element.tip_icon = undefined
            element.tip_title = undefined
            // for (let ii = 0; ii < obj.data.sections_v2.length; ii++) {
            //     if (obj.data.sections_v2[ii].title == "创作中心" || obj.data.sections_v2[ii].title == "創作中心") {
            //         obj.data.sections_v2[ii].title = undefined
            //         obj.data.sections_v2[ii].type = undefined
            //     }
            // }
        })
        if (obj.data?.live_tip) {
            obj.data.live_tip = {}
        }
        if (obj.data?.answer) {
            obj.data.answer = {}
        }
        obj.data.vip_section = undefined
        obj.data.vip_section_v2 = undefined
        obj.data.vip_type = 2
        obj.data.vip.type = 2
        obj.data.vip.status = 1
        obj.data.vip.vip_pay_type = 1
        obj.data.vip.due_date = 4669824160
        change = true
    }
} else if (url.includes('app.bilibili.com/x/v2/account/myinfo?')) {  // 解锁会员画质
    if (obj.data?.vip) {
        obj.data.vip.type = 2
        obj.data.vip.status = 1
        obj.data.vip.vip_pay_type = 1
        obj.data.vip.due_date = 4669824160
        change = true
    }
} else if (url.includes('app.bilibili.com/x/v2/search/square')) {  // 屏蔽热搜
    obj.data = [{
        type: "history",
        title: "搜索历史"
    }]
    change = true
} else if (url.includes('api.live.bilibili.com/xlive/app-room/v1/index/getInfoByRoom')) {  // 直播去广告
    if (obj.data) {
        obj.data.activity_banner_info = undefined
        change = true
    }
} else if (url.includes('pgc/page/bangumi') || url.includes('pgc/page/cinema/tab?')) {  // 追番去广告 && 观影页去广告
    if (obj.result?.modules) {
        obj.result.modules.forEach(module => {
            // 头部banner
            if (module.style.startsWith("banner")) {
                //i.source_content && i.source_content.ad_content
                module.items = module.items.filter(i => i.link.includes("play"))
            } else if (module.style.startsWith("function")) {
                module.items = module.items.filter(i => !i.blink.includes("www.bilibili.com"))
            } else if (module.style.startsWith("tip")) {
                module.items = []
            }
        })
        change = true
    }
} else {
    console.log('触发意外的请求，请确认脚本或复写配置是否正常\n错误URL：' + url)
}

if (change) {
    $done({body: JSON.stringify(obj)})
} else {
    $done({})
}
