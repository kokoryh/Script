// 重写：访问具体要监控的装扮页面，获取装扮id。（支持多个装扮id） 用对象实现{"装扮名1":"编号1", "装扮名2":"编号2"} data.name : data.item_id   预定数值
// 脚本：依次访问各个装扮，获取装扮总数和剩余数，计算出最新号码，返回最新号码数值 (data.data.sale_quantity - data.data.sale_surplus + 1)

// bili_suit_id

// 剩余数量 data.data.sale_surplus
// 装扮总数 data.data.sale_quantity



function queryRemain() {
    const qr = {
        url: 'https://api.bilibili.com/x/garb/v2/mall/suit/detail?item_id=36391'
    };
    $.get(qr, async function(error, response, data) {
        if (error && !data) {
            $.msgBody = `请求失败!\n${error}`;
        } else if (/成功/.test(data)) {
            $.msgBody = "签到成功！🎉";
        } else if (/重复/.test(data)) {
            $.msgBody = "今日已签过 ⚠️";
        } else if (/403/.test(data)) {
            $.msgBody = "Cookie失效 ‼️‼️";
        } else {
            $.msgBody = `签到失败 ‼️\n${data}`;
        }
        $.msg($.name, ``, $.msgBody);
        $.done();
    })
}



