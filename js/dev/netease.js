let obj = JSON.parse($response.body)
if (obj.data?.["interface3.music.163.com"]) {
    obj.data["interface3.music.163.com"].ip = obj.data["interface3.music.163.com"].ip.filter(item => {
        return item.startsWith("112.13.119")
            || item.startsWith("112.13.122")
            || item.startsWith("59.111.19")
            || item.startsWith("59.111.160")
    })
    if (obj.data["interface3.music.163.com"].ip.length) {
        $done({body: JSON.stringify(obj)})
    } else {
        $notification.post("未匹配到指定IP", "", `返回的IP：\n${obj.data["interface3.music.163.com"].ip.toString()}`)
        $done({})
    }
} else {
    $done({})
}
