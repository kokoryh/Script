const fs = require('fs');
var readDir = fs.readdirSync("./");
for (const filename of readDir) {
    if (/.+\.list/.test(filename)) {
        format(filename)
    }
}

function format(filename) {
    try {
        const data = fs.readFileSync(filename, 'UTF-8');
        const lines = data.split(/\r?\n/);

        let RESULT = ""
        const DOMAIN = []
        const DOMAIN_SUFFIX = []
        const DOMAIN_KEYWORD = []
        const IP_CIDR = []
        const IP_CIDR6 = []
        const GEOIP = []
        const USER_AGENT = []
        lines.forEach((line) => {
            let l = line.trim()
            if (l.startsWith("#") || !l) {

            } else {
                let rule = l.split(",")
                rule[0] = rule[0].trim()
                rule[1] = rule[1].split("//")[0].trim()
                if (/^DOMAIN$/i.test(rule[0])) {
                    DOMAIN.push(rule[1])
                } else if (/^DOMAIN-SUFFIX$/i.test(rule[0])) {
                    DOMAIN_SUFFIX.push(rule[1])
                } else if (/^DOMAIN-KEYWORD$/i.test(rule[0])) {
                    DOMAIN_KEYWORD.push(rule[1])
                } else if (/^IP-CIDR$/i.test(rule[0])) {
                    IP_CIDR.push(rule[1])
                } else if (/^IP-CIDR6$/i.test(rule[0])) {
                    IP_CIDR6.push(rule[1])
                } else if (/^GEOIP$/i.test(rule[0])) {
                    GEOIP.push(rule[1])
                } else if (/^USER-AGENT$/i.test(rule[0])) {
                    USER_AGENT.push(rule[1])
                }
            }
        });
        for (const item of DOMAIN.sort()) {
            RESULT += "DOMAIN," + item + "\r\n"
        }
        for (const item of DOMAIN_SUFFIX.sort()) {
            RESULT += "DOMAIN-SUFFIX," + item + "\r\n"
        }
        for (const item of DOMAIN_KEYWORD.sort()) {
            RESULT += "DOMAIN-KEYWORD," + item + "\r\n"
        }
        for (const item of IP_CIDR.sort()) {
            RESULT += "IP-CIDR," + item + ",no-resolve\r\n"
        }
        for (const item of IP_CIDR6.sort()) {
            RESULT += "IP-CIDR6," + item + ",no-resolve\r\n"
        }
        for (const item of GEOIP.sort()) {
            RESULT += "GEOIP," + item + "\r\n"
        }
        for (const item of USER_AGENT.sort()) {
            RESULT += "USER-AGENT," + item + "\r\n"
        }
        fs.writeFile(`../${filename}`, RESULT, function (err) {
            if (err) {
                return console.error(err);
            }
        })
    } catch (err) {
        console.error(err);
    }
}
