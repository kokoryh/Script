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

function handleResponseHeader(responseHeader) {
    let result = {}
    let headers = responseHeader.split(/\r?\n/)
    let url = headers.shift()
    let status = url.split(" ")[1]
    for (const header of headers) {
        if (header) {
            let arr = header.split(":")
            result[arr[0].trim()] = arr[1].trim()
        }
    }
    return {status, result}
}

const _fs = require('fs');
const _modelPath = "input/surge/model.json"
const _requestBodyPath = "input/surge/request.dump"
const _responseBodyPath = "input/surge/response.dump"
const _outputOrgPath = "input/surge/output_org.json"
const _outputDstPath = "input/surge/output_dst.json"

try {
    if (_fs.existsSync(_modelPath)) var _modelData = _fs.readFileSync(_modelPath, "UTF-8");
    if (_fs.existsSync(_requestBodyPath)) var _requestBody = _fs.readFileSync(_requestBodyPath, "UTF-8");
    if (_fs.existsSync(_responseBodyPath)) var _responseBody = _fs.readFileSync(_responseBodyPath, "UTF-8");
} catch (err) {
    console.error(err);
}

let _model = JSON.parse(_modelData)
let _response = handleResponseHeader(_model.responseHeader)

// Surge环境
const $httpClient = 1

const $request = {
    method: _model.method,
    url: _model.URL,
    headers: handleRequestHeader(_model.requestHeader),
    body: _model.streamHasRequestBody ? _requestBody : null
}

const $response = {
    status: _response.status,
    method: _model.method,
    url: _model.URL,
    headers: _response.result,
    body: _model.streamHasResponseBody ? _responseBody : null
}

function $done(result) {
    if (result) {
        _fs.writeFile(_outputOrgPath, $response.body, function (err) {
            if (err) {
                return console.error(err);
            }
        })
        _fs.writeFile(_outputDstPath, result.body, function (err) {
            if (err) {
                return console.error(err);
            }
        })
        console.log("done!")
    } else {
        console.log('done null')
    }
}

{
    // 脚本片段放这里

}
