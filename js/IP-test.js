if ($response.statusCode != 200) {
    $done(Null);
}

function countryCode2emoji(countryCode) {
    const numList = countryCode['toUpperCase']()['split']('')['map'](l => 0x1f1a5 + l['charCodeAt']());
    if (String['fromCodePoint'](...numList) == '🇹🇼') {
        return '🇨🇳';
    } else {
        return String['fromCodePoint'](...numList);
    }
}

function getASN(as) {
    var reg = /\A\S\d+/g;
    var result = as['match'](reg);
    return result[0x0];
}

var body = $response.body;
var obj = JSON.parse(body);

var title = flags.get(obj['countryCode']) + ' ' + obj['city'];
var subtitle = obj['isp'];
var ip = obj['query'];
var description = "地区:" + obj['city'] + '\n' + "运营商:" + obj['isp'] + '\n' + "数据中心:" + obj['org'] + '\n' + "IP:" + obj['query'] + '\n' + "时区:" + obj['timezone'];

$done({title, subtitle, ip, description});
