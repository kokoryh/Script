if ($response.statusCode !== 200) {
    $done(null)
}

// 检查返回数据的语言，中文为true，其他(英文)为false
function checkLang(country) {
    let reg = new RegExp('[\u4E00-\u9FA5]+')
    if (reg.test(country)) return true
    return false
}

// 国家代码转换为emoji
function countryCode2emoji(countryCode) {
    const charList = countryCode.toUpperCase().split('').map(num => 127397 + num.charCodeAt())
    if (String.fromCharCode(...charList) === '🇹🇼') {
        return '🇨🇳'
    } else {
        return String.fromCharCode(...charList)
    }
}

// 提取ASN
function getASN(as) {
    let reg = /\A\S\d+/g;
    let result = as.match(reg);
    return result[0];
}
