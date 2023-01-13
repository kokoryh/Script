var url = $request.url
var change = false
var obj
try {
    obj = JSON.parse($response.body)
} catch (e) {
    console.log(e + "\n错误URL：" + url)
    $done({})
}
if (url.includes("valueadded/alimama/splash_screen")) {  // 开屏广告
    if (obj.data?.ad) {
        for (const item of obj.data.ad) {
            item.set.setting.display_time = 0
            item.creative[0].start_time = 2240150400
            item.creative[0].end_time = 2240150400
        }
        change = true
    }
} else if (url.includes("faas/amap-navigation/main-page")) {  // 首页底栏
    if (obj.data?.cardList) {
        obj.data.cardList = Object.values(obj.data.cardList.filter(item => {
            return item.dataType === "LoginCard"
        }))
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
} else if (url.includes("dsp/profile/index/nodefaas")) {  // 我的页面
    obj.data.tipData = undefined
    if (obj.data?.cardList) {
        obj.data.cardList = Object.values(obj.data.cardList.filter(item => {
            return item.dataType === "MyOrderCard" || item.dataType === "GdRecommendCard"
            // || item.dataKey === "SceneVehicleCard_function"  // 我的车辆
            // || item.dataKey === "AnnualBillCardV2"           // 年度报告
            // || item.dataKey === "PopularActivitiesCard"      // 热门活动
            // || item.dataKey === "GameExcitation"             // 小德爱消除
            // || item.dataKey === "GoodsShelvesCard"           // 精选服务
            // || item.dataKey === "DiyMap_function"            // DIY 地图
        }))
        change = true
    }
} else if (url.includes("search/new_hotword")) {  // 热词
    if (obj.data?.header_hotword) {
        obj.data.header_hotword = []
        change = true
    }
} else if (url.includes("ws/msgbox/pull")) {  // 首页顶部横幅
    if (obj.msgs) {
        obj.msgs = []
        change = true
    }
    if (obj.pull3?.msgs) {
        obj.pull3.msgs = []
        change = true
    }
} else if (url.includes("ws/promotion-web/resource")) {  // 打车页面
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
} else if (url.includes("search/nearbyrec_smart")) {  // 附近页面
    // if (obj.data?.coupon) {
    //     obj.data.coupon = undefined
    //     change = true
    // }
    // if (obj.data?.scene) {
    //     obj.data.scene = undefined
    //     change = true
    // }
    // if (obj.data?.activity) {
    //     obj.data.activity = undefined
    //     change = true
    // }
    // if (obj.data?.commodity_rec) {
    //     obj.data.commodity_rec = undefined
    //     change = true
    // }
    if (obj.data?.modules) {
        obj.data.modules = obj.data.modules.filter(item => {
            return item !== "coupon" &&        // coupon 右下角广告
                // item !== "scene" &&            // 不知道对应啥
                // item !== "activity" &&         // 不知道对应啥
                item !== "commodity_rec"       // commodity_rec 超值套餐
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
