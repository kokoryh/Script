let url = $request.url
let body = null

if (url.includes("statuses") && url.includes("timeline")) {  // 瀑布流
    let obj = JSON.parse($response.body)
    for (const s of ["ad", "advertises", "trends"]) {
        obj[s] = undefined
    }
    if (obj.statuses) {
        obj.statuses = obj.statuses.filter(item => !isAd(item))
    }
    body = JSON.stringify(obj)

} else if (url.includes("ct=feed&a=trends")) {  // 趋势页
    let obj = JSON.parse($response.body)
    if (obj.data?.order) {
        obj.data.order = ["search_topic"]
        body = JSON.stringify(obj)
    }
} else if (url.includes("php?a=search_topic")) {  // 热搜置顶
    let obj = JSON.parse($response.body)
    if (obj.data?.length && obj.data[0].type === 'searchtop') {
        obj.data.shift()
        body = JSON.stringify(obj)
    }
} else if (url.includes("user_center")) {  // 我的页面
    let obj = JSON.parse($response.body)
    if (obj.data?.cards) {
        obj.data.cards = obj.data.cards.filter(item => item.items[0].type !== 'personal_vip')
        body = JSON.stringify(obj)
    }
} else if (url.includes("a=get_coopen_ads")) {  // 开屏
    let obj = JSON.parse($response.body)
    if (obj.data) {
        obj.data.ad_list = []
        obj.data.gdt_video_ad_ios = []
        obj.data.display_ad = 0
        obj.data.ad_ios_id = null
        obj.data.app_ad_ios_id = null
        obj.data.reserve_ad_ios_id = ""
        obj.data.reserve_app_ad_ios_id = ""
        obj.data.ad_duration = 60 * 60 * 24 * 7
        obj.data.ad_cd_interval = 60 * 60 * 24 * 7
        obj.data.pic_ad = []
        body = JSON.stringify(obj)
    }
} else if (url.includes("interface/sdk/sdkad.php")) {  // 开屏
    let obj = JSON.parse(body.substring(0, body.length - 2))
    obj.show_push_splash_ad = false
    obj.background_delay_display_time = 60 * 60 * 24 * 7
    obj.ads = []
    body = JSON.stringify(obj) + "OK"
} else {
    console.log("匹配到其他url：\n" + url)
}

if (body) {
    $done({body})
} else {
    $done({})
}

function isAd(data) {
    if (!data) return false
    if (['广告', '廣告', '热推', '熱推'].includes(data.mblogtypename)) return true
    if (data.promotion && data.promotion.type === 'ad') return true
    return false
}
