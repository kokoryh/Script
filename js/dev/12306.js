var obj = JSON.parse($response.body);
if (obj.materialsList) {
    if (obj.materialsList.length === 1) {
        console.log(obj.materialsList[0].title);
        obj.materialsList[0].filePath = "https://raw.githubusercontent.com/kokoryh/Script/master/data/blank.jpg";
        obj.advertParam.skipTime = 1;
        // obj.advertParam.lg = 1;
    } else if (obj.materialsList.length > 1) {
        obj.materialsList = [{}];
    }
}
$done({body: JSON.stringify(obj)});
