let url = $request.url
let body = null

if (url.includes("manga.bilibili.com")) {  // 哔哩漫画
    let obj = JSON.parse($response.body)
    if (obj.data?.operate) {
        obj.data.operate = null
        body = JSON.stringify(obj)
    }
} else if (url.includes("httpdns.n.netease.com")) {  // 网易云
    let obj = JSON.parse($response.body)
    if (obj.data?.["interface3.music.163.com"]) {
        obj.data["interface3.music.163.com"].ip = obj.data["interface3.music.163.com"].ip.filter(item => {
            return item.startsWith("59.111")
        })
        if (obj.data["interface3.music.163.com"].ip.length) {
            body = JSON.stringify(obj)
        } else {
            $notification.post("未匹配到指定IP", "", `返回的IP：\n${obj.data["interface3.music.163.com"].ip.toString()}`)
        }
    }
} else if (url.includes("interface3.music.163.com/api/search/rcmd/keyword")) {
    let obj = JSON.parse($response.body)
    if (obj.data) {
        obj.data.operateWords = undefined
        obj.data.algWords.forEach(item => {
            item.keyword = ""
        })
        body = JSON.stringify(obj)
    }
} else if (url.includes("wmapi.meituan.com")) {  // 美团外卖
    let obj = JSON.parse($response.body)
    if (obj.data?.startpicture) {
        obj.data.startpicture = []
        body = JSON.stringify(obj)
    }
} else if (url.includes("intsig.net/purchase")) {  // 扫描全能王
    body = '{"data":{"psnl_vip_property":{"expiry":"3287462400"}}}'
} else {
    console.log("匹配到其他url：\n" + url)
}

if (body) {
    $done({body})
} else {
    $done({})
}
