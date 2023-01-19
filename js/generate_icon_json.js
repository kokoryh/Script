const fs = require('fs')
const config = {
    inputPath: 'D:\\Workspace\\Script\\images\\',
    outputPath: 'D:\\Workspace\\Script\\QuantumultX\\icon.json',
    header: 'https://raw.githubusercontent.com/kokoryh/Script/master/images/'
}
const result = {
    "name": "kokoryh 自用图标",
    "description": "",
    "icons": []
}
var readDir = fs.readdirSync(config.inputPath)
for (const filename of readDir) {
    if (/.+\.(png|jpg)/i.test(filename)) {
        generateJson(filename)
    }
}
fs.writeFileSync(config.outputPath, JSON.stringify(result, null, 2))

function generateJson(filename) {
    let obj = {
        "name": filename,
        "url": config.header + filename
    }
    result.icons.push(obj)
}
