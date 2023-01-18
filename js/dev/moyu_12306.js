/***********************************************
 > 应用名称：墨鱼自用12306去广告脚本
 > 脚本作者：@ddgksf2013
 > 微信账号：墨鱼手记
 > 更新时间：2023-01-17
 > 通知频道：https://t.me/ddgksf2021
 > 贡献投稿：https://t.me/ddgksf2013_bot
 > 问题反馈：ddgksf2013@163.com
 > 特别提醒：如需转载请注明出处，谢谢合作！
 > 使用说明：请在本地添加分流 host, ad.12306.cn, direct

 [rewrite_local]

 ^https?:\/\/ad\.12306\.cn\/ad\/ser\/getAdList url script-response-body https://github.com/ddgksf2013/Scripts/raw/master/12306.js

 [mitm]

 hostname = ad.12306.cn

 ***********************************************/













const version = 'V1.0.18';

var ddgksf2013 = JSON.parse($response.body);
ddgksf2013.materialsList && (1 == ddgksf2013.materialsList.length ? (ddgksf2013.materialsList[0].filePath = "https://api.dujin.org/bing/m.php", ddgksf2013.advertParam.skipTime = 1, delete ddgksf2013.materialsList[0].billId, ddgksf2013.materialsList[0].billMaterialsId = "6491") : ddgksf2013.materialsList.length > 1 && (ddgksf2013.materialsList = [{}])), $done({body: JSON.stringify(ddgksf2013)});
