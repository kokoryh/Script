let url = $request.url
let body = null

if (url.includes("manga.bilibili.com")) {  // 哔哩漫画
    let obj = JSON.parse($response.body)
    if (url.includes('HomeFeed')) {
        if (obj.data?.feeds) {
            obj.data.feeds = obj.data.feeds.filter(item => {
                return !(item.type === 15 && item.type === 30)
            })
        }
    } else if (url.includes('AppInit')) {
        if (obj.data?.operate) {
            obj.data.operate = null
            body = JSON.stringify(obj)
        }
    }
} else if (url.includes("wmapi.meituan.com")) {  // 美团外卖
    let obj = JSON.parse($response.body)
    if (url.includes("loadInfo") && obj.data?.startpicture) {
        obj.data.startpicture = []
        body = JSON.stringify(obj)
    } else if (url.includes("startpicture")) {
        obj.data = {"start_picture": "{\"ad\":[],\"mk\":[]}"}
        body = JSON.stringify(obj)
    } else if (url.includes("openscreen")) {
        body = '{"data":{"start_picture":"","setStart_picture":true},"code":0,"msg":null,"setMsg":false,"setCode":true,"setData":true}'
    }
} else if (url.includes("mp.weixin.qq.com/mp/getappmsgad")) {  // 微信公众号
    let obj = JSON.parse($response.body)
    obj["advertisement_num"] = 0
    obj["advertisement_info"] = []
    body = JSON.stringify(obj)
} else if (url.includes("amdc/mobileDispatch")) {  // 高德地图 | 菜鸟
    let header = $request.headers
    let ua = header["User-Agent"] || header["user-agent"]
    if (ua.includes("AMap") || ua.includes("Cainiao")) {
        if ('undefined' !== typeof $task) $done({status: 'HTTP/1.1 404 Not Found'})
        else $done()
    } else $done({})
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

// else if (url.includes("httpdns.n.netease.com")) {  // 网易云
//     let obj = JSON.parse($response.body)
//     if (obj.data?.["interface3.music.163.com"]) {
//         obj.data["interface3.music.163.com"].ip = obj.data["interface3.music.163.com"].ip.filter(item => {
//             return item.startsWith("59.111")
//         })
//         if (obj.data["interface3.music.163.com"].ip.length) {
//             body = JSON.stringify(obj)
//         } else {
//             $notification.post("未匹配到指定IP", "", `返回的IP：\n${obj.data["interface3.music.163.com"].ip.toString()}`)
//         }
//     }
// }
