let url = $request.url
let body = null

if (url.includes("valueadded/alimama/splash_screen")) {  // 开屏广告
    let obj = JSON.parse($response.body)
    if (obj.data?.ad) {
        obj.data.ad = undefined
        // for (const item of obj.data.ad) {
        //     item.set.setting.display_time = 0
        //     item.creative[0].media.display_time = "0"
        //     item.creative[0].start_time = 2240150400
        //     item.creative[0].end_time = 2240150400
        // }
        body = JSON.stringify(obj)
    }
} else if (url.includes("faas/amap-navigation/main-page")) {  // 首页底栏
    let change = false
    let obj = JSON.parse($response.body)
    if (obj.data?.cardList) {
        obj.data.cardList = obj.data.cardList.filter(item => {
            return item.dataType === "LoginCard"
        })
        change = true
    }
    if (obj.data?.pull3?.msgs) {
        obj.data.pull3.msgs = []
        change = true
    }
    if (obj.data?.mapBizList) {
        obj.data.mapBizList = []
        change = true
    }
    if (change) body = JSON.stringify(obj)

} else if (url.includes("ws/shield/frogserver/aocs")) {  // 首页图层
    let obj = JSON.parse($response.body)
    if (obj.data?.home_business_position_config) {  // 首页右中
        obj.data.home_business_position_config = {
            "status": 1,
            "version": "",
            "value": ""
        }
        body = JSON.stringify(obj)
    }
} else if (url.includes("dsp/profile/index/nodefaas")) {  // 我的页面
    let change = false
    let obj = JSON.parse($response.body)
    if (obj.data?.tipData) {
        obj.data.tipData = undefined
        change = true
    }
    if (obj.data?.cardList) {
        let reserve = ["MyOrderCard", "GdRecommendCard"]
        obj.data.cardList = obj.data.cardList.filter(item => {
            return reserve.includes(item.dataType)
        })
        change = true
    }
    if (change) body = JSON.stringify(obj)

} else if (url.includes("search/new_hotword")) {  // 热词
    let obj = JSON.parse($response.body)
    if (obj.data?.header_hotword) {
        obj.data.header_hotword = []
        body = JSON.stringify(obj)
    }
} else if (url.includes("ws/msgbox/pull")) {  // 首页顶部横幅
    let change = false
    let obj = JSON.parse($response.body)
    if (obj.msgs) {
        obj.msgs = []
        change = true
    }
    if (obj.pull3?.msgs) {
        obj.pull3.msgs = []
        change = true
    }
    if (change) body = JSON.stringify(obj)

} else if (url.includes("ws/promotion-web/resource")) {  // 打车页面
    let change = false
    let obj = JSON.parse($response.body)
    if (obj.data?.icon) {
        obj.data.icon = undefined
        change = true
    }
    if (obj.data?.tips) {
        obj.data.tips = undefined
        change = true
    }
    if (obj.data?.popup) {
        obj.data.popup = undefined
        change = true
    }
    if (obj.data?.banner) {
        obj.data.banner = undefined
        change = true
    }
    if (obj.data?.bubble) {
        Object.keys(obj.data.bubble).forEach(key => {
            obj.data.bubble[key] = []
        })
        change = true
    }
    if (change) body = JSON.stringify(obj)

} else if (url.includes("search/nearbyrec_smart")) {  // 附近页面
    let obj = JSON.parse($response.body)
    if (obj.data?.modules) {
        let module = [
            "coupon",           // 右下角广告
            "scene",            // 热词底下的广告横幅
            "activity",         // 热词底下的活动推荐，如指南，0元领水果之类的
            "commodity_rec"     // 超值套餐
        ]
        obj.data.modules = obj.data.modules.filter(item => {
            return !module.includes(item)
        })
        body = JSON.stringify(obj)
    }
} else {
    console.log("匹配到其他url：\n" + url)
}

if (body) {
    $done({body})
} else {
    $done({})
}
