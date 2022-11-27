var obj = JSON.parse($response.body);
if (obj.materialsList) {
    if (obj.materialsList.length === 1) {
        obj.materialsList[0].filePath = "";
        obj.advertParam.skipTime = 0;
        // obj.advertParam.skipTimeAgain = 5;
        obj.advertParam.showSkipBtn = 0;
    } else if (obj.materialsList.length > 1) {
        obj.materialsList = [];
    }
}
$done({body: JSON.stringify(obj)});
