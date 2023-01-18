/***********************************************
 > 应用名称：墨鱼自用高德地图去广告脚本
 > 脚本作者：@ddgksf2013
 > 微信账号：墨鱼手记
 > 更新时间：2022-01-17
 > 通知频道：https://t.me/ddgksf2021
 > 贡献投稿：https://t.me/ddgksf2013_bot
 > 问题反馈：ddgksf2013@163.com
 > 特别提醒：如需转载请注明出处，谢谢合作！
 ***********************************************/
















const version = 'V1.0.17';


var obj = JSON.parse($response.body);
if (-1 != $request.url.indexOf("valueadded/alimama/splash_screen")) {
    if (obj.data && obj.data.ad) for (let a of obj.data.ad) a.set.setting.display_time = 0, a.creative[0].start_time = 2240150400, a.creative[0].end_time = 2240150400;
    $done({body: JSON.stringify(obj)})
} else if (-1 != $request.url.indexOf("faas/amap-navigation/main-page")) obj.data && obj.data.cardList && (obj.data.cardList = Object.values(obj.data.cardList).filter(a => "LoginCard" == a.dataType)), obj.data && obj.data.pull3 && obj.data.pull3.msgs && (obj.data.pull3.msgs = []), obj.data && obj.data.mapBizList && (obj.data.mapBizList = []), $done({body: JSON.stringify(obj)}); else if (-1 != $request.url.indexOf("profile/index/node")) delete obj.data.tipData, obj.data && obj.data.cardList && (obj.data.cardList = Object.values(obj.data.cardList).filter(a => "MyOrderCard" == a.dataType || "GdRecommendCard" == a.dataType)), $done({body: JSON.stringify(obj)}); else if (-1 != $request.url.indexOf("new_hotword")) obj.data && obj.data.header_hotword && (obj.data.header_hotword = []), $done({body: JSON.stringify(obj)}); else if (-1 != $request.url.indexOf("ws/promotion-web/resource")) obj.data && obj.data.icon && (obj.data.icon = []), obj.data && obj.data.banner && (obj.data.banner = []), obj.data && obj.data.tips && (obj.data.tips = []), obj.data && obj.data.popup && (obj.data.popup = []), $done({body: JSON.stringify(obj)}); else if (-1 != $request.url.indexOf("ws/msgbox/pull")) obj.msgs && (obj.msgs = []), obj.pull3 && obj.pull3.msgs && (obj.pull3.msgs = []), $done({body: JSON.stringify(obj)}); else if (-1 != $request.url.indexOf("search/nearbyrec_smart")) {
    if (obj.data && obj.data.coupon && delete obj.data.coupon, obj.data && obj.data.scene && delete obj.data.scene, obj.data && obj.data.activity && delete obj.data.activity, obj.data && obj.data.commodity_rec && delete obj.data.commodity_rec, obj.data && obj.data.modules) {
        let o = [];
        obj.data.modules.forEach(a => {
            "activity" != a && "coupon" != a && "scene" != a && "commodity_rec" != a && o.push(a)
        }), obj.data.modules = o
    }
    $done({body: JSON.stringify(obj)})
} else $done({});
