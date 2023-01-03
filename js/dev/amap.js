let obj = JSON.parse($response.body);
if (obj.msgs && obj.msgs.length) {
    for (const item of obj.msgs) {
        item.body = '啊哈哈哈哈';
        item.showBody = '啊哈哈哈哈';
        // item.starttime = 1988121600;
        // item.expiretime = 1988207999;
    }
    // obj.msgs = [];
    $done({body: JSON.stringify(obj)});
} else {
    $done();
}
// 查看2022打车记忆，领新年礼
