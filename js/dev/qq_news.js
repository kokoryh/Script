// https://github.com/app2smile/rules/blob/master/js/qq-news.js

let url = $request.url
let body = null

if (url.includes("r.inews.qq.com/gw/page/event_detail") || url.includes("r.inews.qq.com/gw/page/channel_feed")) {
    let obj = JSON.parse($response.body)
    if (obj.data?.widget_list) {
        obj.data.widget_list = obj.data.widget_list.filter(item => {
            return item.widget_type !== 'ad_list'
        })
        body = JSON.stringify(obj)
    }
} else {
    let obj = JSON.parse($response.body)
    if (obj.adList) {
        obj.adList = null;
        body = JSON.stringify(obj)
    }
}

if (body) {
    $done({body})
} else {
    $done({})
}
