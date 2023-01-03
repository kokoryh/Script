let obj = JSON.parse($response.body);
if (obj.msgs && obj.msgs.length) {
    // for (const item of obj.msgs) {
    //     item.body = '';
    //     item.showBody = undefined;
    //     item.starttime = 1988121600;
    //     item.expiretime = 1988207999;
    // }
    obj.msgs = [];
    $done({body: JSON.stringify(obj)});
} else {
    $done();
}
