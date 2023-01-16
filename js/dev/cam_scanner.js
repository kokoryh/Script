/*
CamScanner 解锁部分高级特权
---------------------------
Quantumult X:

[rewrite_local]
^https:\/\/(api|api-cs)\.intsig\.net\/purchase\/cs\/query_property\? url script-response-body https://raw.githubusercontent.com/kokoryh/Script/master/js/cam_scanner.js

[mitm]
hostname = ap*.intsig.net
---------------------------
Surge or Loon:

[Script]
http-response https:\/\/(api|api-cs)\.intsig\.net\/purchase\/cs\/query_property\? requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/kokoryh/Script/master/js/cam_scanner.js

[MITM]
hostname = ap*.intsig.net
---------------------------
*/
// let obj = {"data": {"psnl_vip_property": {"expiry": "3287462400"}}};
// $done({body: JSON.stringify(obj)});
let body = '{"data":{"psnl_vip_property":{"expiry":"3287462400"}}}'
$done({body})
