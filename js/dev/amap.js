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
    if (obj.data?.pull3?.msgs) {
        obj.data.pull3.msgs = []
        change = true
    }
    if (obj.data?.cardList) {
        obj.data.cardList = Object.values(obj.data.cardList.filter(item => {
            return item.dataType === "LoginCard"
        }))
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
        obj.msgs = undefined
        change = true
    }
}

if (change) {
    $done({body: JSON.stringify(obj)})
} else {
    $done({})
}
