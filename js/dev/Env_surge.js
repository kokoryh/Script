const _fs = require('fs')
const _request = require('request')
const _compressing = require('compressing')
var _model
const _timestamp = new Date().getTime()
const _isTask = 0
const _isRequest = 0
const _isResponse = 1
const _modelPath = "input/surge/model.json"
const _requestBodyPath = "input/surge/request.dump"
const _responseBodyPath = "input/surge/response.dump"
const _outputPath = "output/"
const _persistentStore = {  // 持久化数据
    "key": "value",
}
const $httpClient = {
    get: function (options, callback = () => {
    }) {
        _request.get(options, (err, resp, body) => {
            if (!err && resp) {
                resp.body = body
                resp.statusCode = resp.status ? resp.status : resp.statusCode
                resp.status = resp.statusCode
            }
            callback(err, resp, body)
        })
    },
    post: function (options, callback = () => {
    }) {
        _request.post(options, (err, resp, body) => {
            if (!err && resp) {
                resp.body = body
                resp.statusCode = resp.status ? resp.status : resp.statusCode
                resp.status = resp.statusCode
            }
            callback(err, resp, body)
        })
    }
}
const $persistentStore = {
    write: (val, key) => {
        return _persistentStore[key] = val
    },
    read: (key) => {
        return _persistentStore[key]
    }
}
const $notification = {
    post: (title, subtitle, body) => {
        console.log(`notify----------\ntitle: ${title}\nsubtitle: ${subtitle}\nbody: ${body}`)
    }
}
var $request   // method, url, headers, body
var $response  // status, method, url, headers, body
!(async () => {
    if (_isRequest || _isResponse) {
        $request = {}
        $response = {}
        await _handleModel()
        await _handleRequestHeader()
        await _handleRequestBody()
        await _handleResponseHeader()
        await _handleResponseBody()
    }
})().catch((e) => {
    console.log(e)
}).finally(() => {
    // console.log($request)
    // console.log($response)
    // 脚本片段放这里


})

function $done(result) {
    if (!result) {
        console.log('----------finish with $done()----------')
    } else if (!Object.keys(result).length) {
        console.log('----------finish with $done({})----------')
    } else {
        if (_isResponse) {
            console.log("----------do response----------")
            if (result.body) {
                console.log("body changed")
                _writeFile(_outputPath + _timestamp + "-body-2.json", result.body)
            }
            if (result.headers) {
                console.log("header changed")
                console.log("origin headers:\n" + $request.headers)
                console.log("origin headers:\n" + result.headers)
            }
            if (result.status) {
                console.log("status changed")
                console.log("origin status:\n" + $request.status)
                console.log("changed status:\n" + result.status)
            }
            console.log("----------done response----------")
        } else {
            console.log("----------do request----------")
            if (result.body) {
                console.log("body changed")
                _writeFile(_outputPath + _timestamp + "-body-1.json", $request.body)
                _writeFile(_outputPath + _timestamp + "-body-2.json", result.body)
            }
            if (result.headers) {
                console.log("header changed")
                console.log("origin headers:\n" + $request.headers)
                console.log("origin headers:\n" + result.headers)
            }
            if (result.url) {
                console.log("url changed")
                console.log("origin url:\n" + $request.url)
                console.log("changed url:\n" + result.url)
            }
            console.log("----------done request----------")
        }
    }
}

function _writeFile(outputPath, content) {
    _fs.writeFile(outputPath, content, function (err) {
        if (err) {
            return console.error(err);
        }
    })
}

async function _handleModel() {
    if (_fs.existsSync(_modelPath)) var _modelData = _fs.readFileSync(_modelPath, "UTF-8")
    _model = JSON.parse(_modelData)
    $request.method = _model.method
    $request.url = _model.URL
    $response.method = _model.method
    $response.url = _model.URL
}

async function _handleRequestHeader() {
    let data = _model.requestHeader
    let result = {}
    let headers = data.split(/\r?\n/)
    headers.shift()
    for (const header of headers) {
        if (header) {
            let arr = header.split(":")
            result[arr[0].trim()] = arr[1].trim()
        }
    }
    $request.headers = result
}

async function _handleRequestBody() {
    let data
    if (_fs.existsSync(_requestBodyPath)) {
        data = _fs.readFileSync(_requestBodyPath, "UTF-8");
        let result = {}
        let params = data.split(/\r?\n/)
        for (let i = 1; i < params.length - 2; i++) {
            let arr = params[i].split(":")
            result[arr[0].trim().replace(/"(.+)"/, "$1")] = arr[1].split(",")[0].trim().replace(/"(.+)"/, "$1")
        }
        if (_model.streamHasRequestBody) $request.body = result
    }
}

async function _handleResponseHeader() {
    let data = _model.responseHeader
    let result = {}
    let headers = data.split(/\r?\n/)
    let statuses = headers.shift()
    let status = statuses.split(" ")[1]
    for (const header of headers) {
        if (header) {
            let arr = header.split(":")
            result[arr[0].trim()] = arr[1].trim()
        }
    }
    $response.status = status
    $response.headers = result
}

async function _handleResponseBody() {
    let data
    let outputPath = _outputPath + _timestamp + "-body-1.json"
    if ($response.headers["content-encoding"] === "gzip") {
        await _compressing.gzip.uncompress(_responseBodyPath, outputPath)
        console.log("gunzip finish")
        data = _fs.readFileSync(outputPath, "UTF-8")
    } else {
        if (_fs.existsSync(_responseBodyPath)) {
            data = _fs.readFileSync(_responseBodyPath, "UTF-8")
            _fs.writeFileSync(outputPath, data)
        }
    }
    if (_model.streamHasResponseBody) $response.body = data
}
