var obj = JSON.parse($response.body);
if (obj.materialsList) {
    if (obj.materialsList.length === 1) {
        obj.materialsList[0].filePath = "";
        obj.advertParam.skipTime = 50;
        obj.advertParam.showSkipBtn = -1;
        obj.advertParam.skipTimeAgain = 60;
    } else if (obj.materialsList.length > 1) {
        obj.materialsList = [{}];
    }
}
$done({body: JSON.stringify(obj)});