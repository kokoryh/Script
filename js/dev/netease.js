let obj = JSON.parse($response.body)
if (obj.data?.["interface3.music.163.com"]) {
    obj.data["interface3.music.163.com"].ip = obj.data["interface3.music.163.com"].ip.filter(item => {
        return item.startsWith("112.13.119")
            || item.startsWith("112.13.122")
            || item.startsWith("59.111.19")
            || item.startsWith("59.111.160")
    })
    $done({body: JSON.stringify(obj)})
} else {
    $done({})
}
