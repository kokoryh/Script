var obj = JSON.parse($response.body);
if (obj.materialsList) {
    if (obj.materialsList.length === 1) {
        obj.materialsList[0].filePath = "";
        obj.advertParam.skipTime = 1;
        obj.advertParam.lg = 1;
    } else if (obj.materialsList.length > 1) {
        obj.materialsList = undefined;
    }
}
$done({body: JSON.stringify(obj)});
