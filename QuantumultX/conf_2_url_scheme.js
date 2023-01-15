const fs = require('fs')
const config = {
    inputFile: ['resource'],
    header: 'https://quantumult.app/x/open-app/add-resource?remote-resource='
}
for (const filename of config.inputFile) {
    const content = fs.readFileSync(`./${filename}.conf`, 'UTF-8')
    const lines = content.split(/\r?\n/)
    let result = handleLines(lines)
    writeFile(`./${filename}.md`, result.result_md)
    writeFile(`./${filename}.txt`, result.result_txt)
}

function writeFile(outputPath, content) {
    fs.writeFile(outputPath, content, function (err) {
        if (err) {
            return console.error(err);
        }
    })
}

function handleLines(lines) {
    let result_md = ''
    let result_txt = ''
    let myStack = []
    lines.forEach(line => {
        let l = line.trim()
        if (l) { // 非空行的情况
            if (l.startsWith('#')) {
                if (/#.*收集/.test(l)) {  // 标题
                    result_md += '# QuantumultX 资源收集(一键安装需qx版本≥1.0.30)\n'
                    result_txt += 'QuantumultX 资源收集\n'
                } else if (/#\s(功能性|去广告)(分流|重写)$/.test(l)) {
                    let content = l.split('#')[1].trim()
                    result_md += `## ${content}\n`
                    result_txt += `${content}\n`
                } else if (l.startsWith('# @')) {  // 作者
                    let content = l.split(/\s+/)
                    let author = content[1]
                    let link = content[2]
                    result_md += `### [${author}](${link})\n`
                    result_txt += `${author}\n`
                } else if (l.startsWith('# *')) {  // 注释
                    let content = l.split(/#\s\*/)[1]
                    result_md += `#### ${content}\n`
                    result_txt += `${content}\n`
                } else {
                    let tmp = l.split(/#\s*/)[1]
                    let content = tmp.split(/[\s,，(（]/)
                    myStack.push(content[0].trim())
                    if (content.length > 1) myStack.push(l.match(/[^,，(（]*(.+)/)[1].trim())
                }
            } else if (l.startsWith('[') || l.startsWith(';')) {

            } else {
                let url_encoded_json = {}
                if (l.includes('force-policy')) {
                    url_encoded_json['filter_remote'] = [l]
                } else {
                    url_encoded_json['rewrite_remote'] = [l]
                }
                let eURL = config.header + encodeURIComponent(JSON.stringify(url_encoded_json))
                if (!myStack.length) {
                    let tag = l.match(/tag=([^,]*)/)[1]
                    myStack.push(tag)
                }
                if (myStack.length > 1) {
                    let part1 = myStack.shift()
                    let part2 = myStack.shift()
                    result_md += `[${part1}](${eURL}) ${part2}  \n`
                    result_txt += `${part1}${part2}\n${eURL}\n`
                } else {
                    let part1 = myStack.shift()
                    result_md += `[${part1}](${eURL})  \n`
                    result_txt += `${part1}\n${eURL}\n`
                }
            }
        } else { // 空行的情况
            result_txt += '\n'
        }
    })
    return {result_md, result_txt}
}
