let url = $request.url
let obj = JSON.parse($response.body)
let change = false
if (url.includes("ws/valueadded/alimama/splash_screen")) {
    if (obj.data?.ad) {
        for (const item of obj.data.ad) {
            item.set.setting.display_time = 0
            item.creative[0].start_time = 2240150400
            item.creative[0].end_time = 2240150400
        }
        console.log("valueadded/alimama/splash_screen")
        change = true
    }
} else if (url.includes("ws/faas/amap-navigation/main-page")) {
    if (obj.data?.cardList) {
        obj.data.cardList = Object.values(obj.data.cardList.filter(item => {
            return item.dataType === "LoginCard"
        }))
        console.log("faas/amap-navigation/main-page")
        change = true
    }
} else if (url.includes("shield/dsp/profile/index/nodefaas")) {
    obj.data.tipData = undefined
    if (obj.data?.cardList) {
        obj.data.cardList = Object.values(obj.data.cardList.filter(item => {
            return item.dataType === "MyOrderCard" || item.dataType === "GdRecommendCard"
        }))
        console.log("dsp/profile/index/nodefaas")
        change = true
    }
} else if (url.includes("shield/search/new_hotword")) {
    if (obj.data?.header_hotword) {
        obj.data.header_hotword = []
        console.log("search/new_hotword")
        change = true
    }
} else if (url.includes("ws/msgbox/pull")) {
    if (obj.msgs) {
        obj.msgs = undefined
        console.log("ws/msgbox/pull")
        change = true
    }
}
if (change) {
    $done({body: JSON.stringify(obj)})
} else {
    $done()
}
