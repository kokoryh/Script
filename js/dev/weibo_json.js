// 修改自@ddgksf2013的微博去广告脚本: https://raw.githubusercontent.com/ddgksf2013/Scripts/master/weibo_json.js

// const mainConfig = {};
const modifyStatusesUrls = ['statuses/friends/timeline', 'statuses/friends_timeline', 'statuses/unread_friends_timeline', 'statuses/unread_hot_timeline'];
const modifyOtherUrls = {
    'ct=feed&a=trends': 'removeTopics',
    'user_center': 'modifiedUserCenter',
    'interface/sdk/sdkad.php': 'removePhpScreenAds',
    'a=get_coopen_ads': 'removeIntlOpenAds',
    'php?a=search_topic': 'removeSearchTop'
}

var body = $response.body;
var url = $request.url;
let method = getModifyMethod(url);
if (method) {
    var func = eval(method);
    if (method === 'removePhpScreenAds') {
        let data = JSON.parse(body.substring(0, body.length - 2));
        new func(data);
        body = JSON.stringify(data) + "OK";
    } else {
        let data = JSON.parse(body);
        new func(data);
        body = JSON.stringify(data);
    }
    $done({body});
} else {
    $done({})
}

// 返回调用的函数名
function getModifyMethod(url) {
    for (const s of modifyStatusesUrls) {
        if (url.indexOf(s) > -1) {
            return 'removeTimeLine';
        }
    }
    for (const [path, method] of Object.entries(modifyOtherUrls)) {
        if (url.indexOf(path) > -1) {
            return method;
        }
    }
    return null;
}

// 热搜置顶
function removeSearchTop(data) {
    if (!data.data || data.data.length === 0) {
        return data;
    }
    if (data.data[0].type === 'searchtop') {
        data.data.shift();
    }
    return data
}

// 趋势页
function removeTopics(data) {
    if (!data.data || data.data.length === 0) {
        return data;
    }
    if (data.data.order) {
        data.data.order = ["search_topic"]
    }
    if (data.data.search_topic) {
        data.data.search_topic.cards.splice(1, 0, {})
    }
    return data;
}

// 我的页面
function modifiedUserCenter(data) {
    if (!data.data || data.data.length === 0) {
        return data;
    }
    data.data.cards = Object.values(data.data.cards).filter(item => item.items[0].type !== 'personal_vip');
    return data;
}

// 开屏
function removePhpScreenAds(data) {
    if (!data.ads || data.ads.length === 0) {
        return data;
    }
    data.show_push_splash_ad = false;
    data.background_delay_display_time = 60 * 60 * 24 * 7;
    data.ads = [];
    return data;
}

// 开屏
function removeIntlOpenAds(data) {
    if (!data.data || data.data.length === 0) {
        return data;
    }
    data.data.ad_list = [];
    data.data.gdt_video_ad_ios = [];
    data.data.display_ad = 0;
    data.data.ad_ios_id = null;
    data.data.app_ad_ios_id = null;
    data.data.reserve_ad_ios_id = "";
    data.data.reserve_app_ad_ios_id = "";
    data.data.ad_duration = 60 * 60 * 24 * 7;
    data.data.ad_cd_interval = 60 * 60 * 24 * 7;
    data.data.pic_ad = [];
    return data;
}

function isAd(data) {
    if (!data) {
        return false;
    }
    if (data.mblogtypename === '广告' || data.mblogtypename === '热推') {
        return true
    }
    if (data.mblogtypename === '廣告' || data.mblogtypename === '熱推') {
        return true
    }
    if (data.promotion && data.promotion.type === 'ad') {
        return true
    }
    return false;
}

function isBlock(data) {
    let blockIds = mainConfig.blockIds || [];
    if (blockIds.length === 0) {
        return false;
    }
    let uid = data.user.id;
    for (const blockId of blockIds) {
        if (blockId == uid) {
            return true;
        }
    }
    return false;
}

// 瀑布流内广告
function removeTimeLine(data) {
    for (const s of ["ad", "advertises", "trends"]) {
        if (data[s]) {
            data[s] = undefined;
        }
    }
    if (!data.statuses) {
        return;
    }
    let newStatuses = [];
    for (const s of data.statuses) {
        if (!isAd(s)) {
            newStatuses.push(s);
            //lvZhouHandler(s);
            // if (!isBlock(s)) {
            //     newStatuses.push(s);
            // }
        }
    }
    data.statuses = newStatuses;
}
