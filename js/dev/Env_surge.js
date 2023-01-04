const _fs = require('fs')
const _modelPath = "input/surge/model.json"
const _requestBodyPath = "input/surge/request.dump"
const _responseBodyPath = "input/surge/response.dump"
const _outputPath = "input/surge/"
const _isResponse = 1
const _persistentStore = {  // 持久化数据
    "key": "value"
}

function handleRequestHeader(requestHeader) {
    let result = {}
    let headers = requestHeader.split(/\r?\n/)
    headers.shift()
    for (const header of headers) {
        if (header) {
            let arr = header.split(":")
            result[arr[0].trim()] = arr[1].trim()
        }
    }
    return result
}

function handleRequestBody(requestBody) {
    let result = {}
    let params = requestBody.split(/\r?\n/)
    for (let i = 1; i < params.length - 2; i++) {
        let arr = params[i].split(":")
        result[arr[0].trim().replace(/"(.+)"/, "$1")] = arr[1].split(",")[0].trim().replace(/"(.+)"/, "$1")
    }
    return result
}

function handleResponseHeader(responseHeader) {
    let result = {}
    let headers = responseHeader.split(/\r?\n/)
    let statuses = headers.shift()
    let status = statuses.split(" ")[1]
    for (const header of headers) {
        if (header) {
            let arr = header.split(":")
            result[arr[0].trim()] = arr[1].trim()
        }
    }
    return {status, headers: result}
}

function _writeFile(filename, content) {
    let timestamp = new Date().getTime()
    _fs.writeFile(_outputPath + timestamp + "-" + filename + ".json", content, function (err) {
        if (err) {
            return console.error(err);
        }
    })
}

// Surge环境
const $httpClient = 1

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

try {
    if (_fs.existsSync(_modelPath)) var _modelData = _fs.readFileSync(_modelPath, "UTF-8");
    if (_fs.existsSync(_requestBodyPath)) var _requestBody = _fs.readFileSync(_requestBodyPath, "UTF-8");
    if (_fs.existsSync(_responseBodyPath)) var _responseBody = _fs.readFileSync(_responseBodyPath, "UTF-8");
} catch (err) {
    console.error(err);
}

let _model = JSON.parse(_modelData)
let _response = handleResponseHeader(_model.responseHeader)

const $request = {
    method: _model.method,
    url: _model.URL,
    headers: handleRequestHeader(_model.requestHeader),
    body: _model.streamHasRequestBody ? handleRequestBody(_requestBody) : null
}

const $response = {
    status: _response.status,
    method: _model.method,
    url: _model.URL,
    headers: _response.headers,
    body: _model.streamHasResponseBody ? _responseBody : null
}

function $done(result) {
    if (result) {
        if (_isResponse) {
            if (result.body) {
                _writeFile("body-1", $response.body)
                _writeFile("body-2", result.body)
            }
            if (result.headers) {
                _writeFile("header-1", $response.headers)
                _writeFile("header-2", result.headers)
            }
            console.log("response done!")
        } else {
            if (result.body) {
                _writeFile("body-1", $request.body)
                _writeFile("body-2", result.body)
            }
            if (result.headers) {
                _writeFile("header-1", $request.headers)
                _writeFile("header-2", result.headers)
            }
            console.log("request done!")
        }
    } else {
        console.log('done null')
    }
}

// 脚本片段放这里
{


}
