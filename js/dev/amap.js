let obj = JSON.parse($response.body);
if (obj.msgs && obj.msgs.length) {
    for (const item of obj.msgs) {
        item.body = '';
    }
    $done({body: JSON.stringify(obj)});
} else {
    $done();
}
