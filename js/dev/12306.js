var obj = JSON.parse($response.body);
if (obj.materialsList) {
    if (obj.materialsList.length === 1) {
        obj.materialsList[0].filePath = "";
        obj.materialsList[0].advNature = 4;
        obj.advertParam.skipTime = 30;
        obj.advertParam.lg = 1;
    } else if (obj.materialsList.length > 1) {
        obj.materialsList = [{}];
    }
}
$done({body: JSON.stringify(obj)});
