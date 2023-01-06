// copy from @ddgksf2013 https://raw.githubusercontent.com/ddgksf2013/Scripts/master/12306.js

let obj = JSON.parse($response.body)
if (obj.materialsList) {
    if (obj.materialsList.length === 1) {
        obj.materialsList[0].filePath = "https://api.dujin.org/bing/m.php"
        obj.materialsList[0].billId = undefined
        obj.materialsList[0].billMaterialsId = "1000000"
        obj.advertParam.skipTime = 1
    } else if (obj.materialsList.length > 1) {
        obj.materialsList = [{}]
    }
}
$done({body: JSON.stringify(obj)})
