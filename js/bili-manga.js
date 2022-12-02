var obj = JSON.parse($response.body);
if (obj.data && obj.data.operate) {
    obj.data.operate = null;
    obj.data.teenager_frequency = 0;
}
$done({body: JSON.stringify(obj)});