/*
功能：
1、合并规则：DOMAIN与DOMAIN-SUFFIX合并，DOMAIN-SUFFIX之间合并，IP-CIDR(6)合并 todo
2、移除重复规则
3、规则排序：将规则按照DOMAIN，DOMAIN-SUFFIX，DOMAIN-KEYWORD，IP-CIDR，IP-CIDR6，IP-ASN，GEOIP，USER-AGENT排序，IP类规则会添加no-resolve
4、导出规则：将规则导出为Surge和Clash格式。对单文件超过1000行的，额外导出为DOMAIN-SET格式
*/

const fs = require('fs')
const _ = require('lodash')
const config = {
    inputPath: './',
    surgeOutputPath: '../',
    clashOutputPath: '../../../Clash/rule/'
}
var readDir = fs.readdirSync(config.inputPath)
for (const filename of readDir) {
    if (/.+\.list/.test(filename)) {
        format(filename)
    }
}

function format(filename) {
    try {
        const content = fs.readFileSync(filename, 'UTF-8')
        const lines = content.split(/\r?\n/)
        let ruleDict = classifyRules(lines)
        let result = contactRule(handleRuleDict(ruleDict))
        let fn = filename.match(/(.+)\./)[1]
        exportRule(config.surgeOutputPath, `${fn}.list`, result.surge)
        exportRule(config.clashOutputPath, `${fn}.yaml`, result.clash)
        // if (result.surge_domain_set) {
        //     exportRule(outputPath.surge, `${fn}_Domain.list`, result.surge_domain_set)
        //     exportRule(outputPath.clash, `${fn}_Domain.yaml`, result.clash_domain_set)
        // }
        // if (result.surge_others) {
        //     exportRule(outputPath.surge, `${fn}_Others.list`, result.surge_others)
        //     exportRule(outputPath.clash, `${fn}_Others.yaml`, result.clash_others)
        // }
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
function contactRule(ruleDict) {
    let surge = ''
    let surge_domain_set = ''
    let surge_others = ''
    let clash = 'payload:\r\n'
    let clash_domain_set = 'payload:\r\n'
    let clash_others = 'payload:\r\n'

    let keys = Object.keys(ruleDict)
    let domain_keys = ['DOMAIN', 'DOMAIN-SUFFIX']
    let other_keys = keys.filter(key => {
        return !domain_keys.includes(key)
    })
    for (const key of keys) {
        for (const item of ruleDict[key]) {
            if (/IP-/i.test(key)) {
                surge += `${key},${item},no-resolve\r\n`
                clash += `  - ${key},${item},no-resolve\r\n`
            } else {
                surge += `${key},${item}\r\n`
                clash += `  - ${key},${item}\r\n`
            }
        }
    }
    if (ruleDict['DOMAIN'].length + ruleDict['DOMAIN-SUFFIX'].length > 1000) {
        // 处理DOMAIN-SET情况
        for (const item of ruleDict['DOMAIN']) {
            surge_domain_set += `${item}\r\n`
            clash_domain_set += `  - '${item}'\r\n`
        }
        for (const item of ruleDict['DOMAIN-SUFFIX']) {
            surge_domain_set += `.${item}\r\n`
            clash_domain_set += `  - '+.${item}'\r\n`
        }
        // Others
        for (const key of other_keys) {
            for (const item of ruleDict[key]) {
                if (/IP-/i.test(key)) {
                    surge_others += `${key},${item},no-resolve\r\n`
                    clash_others += `  - ${key},${item},no-resolve\r\n`
                } else {
                    surge_others += `${key},${item}\r\n`
                    clash_others += `  - ${key},${item}\r\n`
                }
            }
        }
    }
    return {surge, surge_domain_set, surge_others, clash, clash_domain_set, clash_others}
}

// 处理规则，对 ruleDict 进行合并，去重，排序
function handleRuleDict(ruleDict) {
    let newDomain = mergeDomain(ruleDict['DOMAIN'], ruleDict['DOMAIN-SUFFIX'])
    let newRuleDict = {
        'DOMAIN': newDomain['DOMAIN'].sort(),
        'DOMAIN-SUFFIX': newDomain['DOMAIN-SUFFIX'].sort(),
        'DOMAIN-KEYWORD': unique(ruleDict['DOMAIN-KEYWORD']).sort(),
        'IP-CIDR': unique(ruleDict['IP-CIDR']).sort(),
        'IP-CIDR6': unique(ruleDict['IP-CIDR6']).sort(),
        'IP-ASN': unique(ruleDict['IP-ASN']).sort(),
        'GEOIP': unique(ruleDict['GEOIP']).sort(),
        'USER-AGENT': unique(ruleDict['USER-AGENT']).sort()
    }
    return newRuleDict
}

// 数组去重
function unique(arr) {
    return Array.from(new Set(arr))
}

// 合并 DOMAIN 类规则
function mergeDomain(domainList, domainSuffixList) {
    let tree = {}
    let result = {'DOMAIN': [], 'DOMAIN-SUFFIX': []}
    for (const domain of domainList) {
        let s = domain.split('.').reverse()
        _.merge(tree, arr2tree(s, false))
    }
    for (const domainSuffix of domainSuffixList) {
        let s = domainSuffix.split('.').reverse()
        _.merge(tree, arr2tree(s, true))
    }
    tree2arr(tree, result)
    return result
}

// 将树状结构导出为数组
function tree2arr(tree, result, pre = []) {
    let keys = Object.keys(tree)
    if (keys.includes('.')) {
        result['DOMAIN-SUFFIX'].push(arr2rule(pre))
        pre.pop()
        return
    }
    for (let key in tree) {
        if (typeof (tree[key]) == 'object') {
            pre.push(key)
            tree2arr(tree[key], result, pre)  // 递归遍历
        } else {
            if (key === '$') result['DOMAIN'].push(arr2rule(pre))
        }
    }
    pre.pop()
}

// 将规则的数组拼接成string
function arr2rule(arr) {
    let res = ''
    for (let i = arr.length - 1; i >= 0; i--) {
        res += arr[i] + '.'
    }
    return res.substring(0, res.length - 1)
}

// 将规则的数组转化为树状结构
function arr2tree(arr, isSuffix) {
    let tree = {}
    let p = tree
    for (let i = 0; i <= arr.length; i++) {
        if (i === arr.length) {
            if (isSuffix) {
                p['.'] = 1
            } else {
                p['$'] = 1
            }
        } else {
            p[arr[i]] = {}
            p = p[arr[i]]
        }
    }
    return tree
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
            rule[1] = rule[1].split('//')[0].trim()
            for (const key of keys) {
                let regex = new RegExp(`^${key}$`, 'i')
                if (regex.test(rule[0])) {
                    result[key].push(rule[1])
                    break
                }
            }
        }
    })
    return result
}
