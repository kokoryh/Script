const fs = require('fs')
const content = fs.readFileSync('./advertising.conf', 'UTF-8')
const lines = content.split(/\r?\n/)
fs.writeFile('./advertising.md', handleLines(lines), function (err) {
    if (err) {
        return console.error(err);
    }
})

function handleLines(lines) {
    let result = ''
    let tagStack = []
    lines.forEach(line => {
        let l = line.trim()
        if (l) {
            if (l.startsWith('#')) {
                if (l.startsWith('# 去广告分流和重写收集')) result += '# 去广告分流和重写收集(一键安装需qx版本≥1.0.30)\n'
                else if (l.startsWith('# 分流')) result += '## 分流(去广告规则应放在规则修正下面)\n'
                else if (l.startsWith('# 重写')) result += '## 重写\n'
                else if (l.startsWith('# @') || l.startsWith('# *')) {
                    let tmp = l.split(/#\s?/)
                    result += `### ${tmp[1].trim()}\n`
                } else {
                    let tmp = l.split('#')
                    let tmp2 = tmp[1].split(/[,，(（]/)
                    tagStack.push(tmp2[0].trim())
                    if (tmp2.length > 1) tagStack.push(l.match(/[^,，(（]*(.+)/)[1].trim())
                }
            } else if (l.startsWith('[')) {

            } else {
                let url_encoded_json = {}
                if (l.includes('force-policy')) {
                    url_encoded_json['filter_remote'] = [l]
                } else {
                    url_encoded_json['rewrite_remote'] = [l]
                }
                let eURL = 'https://quantumult.app/x/open-app/add-resource?remote-resource=' + encodeURIComponent(JSON.stringify(url_encoded_json))
                if (tagStack.length > 1) result += `#### [${tagStack.shift()}](${eURL}) ${tagStack.shift()}\n`
                else result += `#### [${tagStack.shift()}](${eURL})\n`
            }
        }
    })
    return result
}
