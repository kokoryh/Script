var obj = JSON.parse($response.body);
obj.data.teenager_frequency = 0;
if (obj.data && obj.data.operate) {
    obj.data.operate = null;
}
$done({body: JSON.stringify(obj)});