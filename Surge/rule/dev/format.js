/*
功能：
1、规则排序：将规则按照DOMAIN，DOMAIN-SUFFIX，DOMAIN-KEYWORD，IP-CIDR，IP-CIDR6，IP-ASN，GEOIP，USER-AGENT排序，IP类规则会添加no-resolve
2、移除重复规则
3、合并规则：DOMAIN与DOMAIN-SUFFIX合并，DOMAIN-SUFFIX之间合并，IP-CIDR(6)合并 todo
4、导出规则：将规则导出为Surge和Clash格式，对纯DOMAIN或DOMAIN-SUFFIX规则的，额外导出为DOMAIN-SET格式
*/

const fs = require('fs');
var readDir = fs.readdirSync('./');
var outputPath = {
    surge: '../',
    clash: '../../../Clash/rule/'
}
for (const filename of readDir) {
    if (/.+\.list/.test(filename)) {
        format(filename)
    }
}

function format(filename) {
    try {
        const content = fs.readFileSync(filename, 'UTF-8');
        const lines = content.split(/\r?\n/);
        let ruleDict = classifyRules(lines)
        let result = handleRuleDict(ruleDict)
        let fn = filename.match(/(.+)\./)[1]
        exportRule(outputPath.surge, `${fn}.list`, result.surge)
        exportRule(outputPath.clash, `${fn}.yaml`, result.clash)
        if (result.surge_domain_set) {
            exportRule(outputPath.surge, `${fn}_Domain.list`, result.surge_domain_set)
            exportRule(outputPath.clash, `${fn}_Domain.yaml`, result.clash_domain_set)
        }
    } catch (err) {
        console.error(err);
    }
}

// 导出规则
function exportRule(outputPath, filename, content) {
    fs.writeFile(`${outputPath}${filename}`, content, function (err) {
        if (err) {
            return console.error(err);
        }
    })
}

// 拼接规则
function handleRuleDict(ruleDict) {
    let surge = ''
    let surge_domain_set = ''
    let clash = 'payload:\r\n'
    let clash_domain_set = 'payload:\r\n'
    let keys = Object.keys(ruleDict)

    let count = {}
    let sum = 0
    for (const key of keys) {
        let rules = unique(ruleDict[key]).sort()
        count[key] = rules.length
        sum += rules.length
        for (const item of rules) {
            if (/IP-CIDR/i.test(key)) {
                surge += `${key},${item},no-resolve\r\n`
                clash += `  - ${key},${item},no-resolve\r\n`
            } else {
                surge += `${key},${item}\r\n`
                clash += `  - ${key},${item}\r\n`
            }
        }
    }
    // 处理DOMAIN-SET情况
    if (count['DOMAIN'] + count['DOMAIN-SUFFIX'] === sum) {
        for (const item of unique(ruleDict['DOMAIN']).sort()) {
            surge_domain_set += `${item}\r\n`
            clash_domain_set += `  - '${item}'\r\n`
        }
        for (const item of unique(ruleDict['DOMAIN-SUFFIX']).sort()) {
            surge_domain_set += `.${item}\r\n`
            clash_domain_set += `  - '+.${item}'\r\n`
        }
    }
    return {surge, clash, surge_domain_set, clash_domain_set}
}

// 合并规则 todo

// 移除重复规则
function unique(arr) {
    return Array.from(new Set(arr))
}

// 分类规则
function classifyRules(arr) {
    let result = {
        'DOMAIN': [],
        'DOMAIN-SUFFIX': [],
        'DOMAIN-KEYWORD': [],
        'IP-CIDR': [],
        'IP-CIDR6': [],
        'IP-ASN': [],
        'GEOIP': [],
        'USER-AGENT': []
    }
    let keys = Object.keys(result)
    arr.forEach(line => {
        let l = line.trim()
        if (l && !/^(#|;|\/\/)/.test(l)) {
            let rule = l.split(',')
            rule[0] = rule[0].trim()
            rule[1] = rule[1].split("//")[0].trim()
            for (const key of keys) {
                let regex = new RegExp(`^${key}$`, "i")
                if (regex.test(rule[0])) {
                    result[key].push(rule[1])
                    break
                }
            }
        }
    })
    return result
}
