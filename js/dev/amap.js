let obj = JSON.parse($response.body);
if (obj.msgs) {
    obj.msgs = undefined;
    $done({body: JSON.stringify(obj)});
} else {
    $done();
}
