var obj = JSON.parse($response.body);
if (obj.data && obj.data.operate) {
    obj.data.operate = null;
    $done({body: JSON.stringify(obj)});
} else {
    $done();
}