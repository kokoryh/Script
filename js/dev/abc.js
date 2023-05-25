const imageSize = require('image-size')
const request = require('request')

const imgUrl = 'https://enjoy.cdn-static.abchina.com/yx-engine-web/file/download/3a96e102f6004ac48980cb8c2d2613399900004820230323'

const options = {
    url: imgUrl,
    method: 'GET',
    encoding: null,
    proxy: 'http://127.0.0.1:7890'
}

request.get(options, function (err, response, body) {
    let buffer = new Buffer(body)
    console.log(imageSize(buffer))
})

// let img = $response.body
// console.log(imageSize(img))
// $done({})
