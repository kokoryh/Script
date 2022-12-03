var body = $response.body;
if (body && body.length < 45) {
    var obj = JSON.parse(body);
    var user_equip = $prefs.valueForKey("bili_user_equip");
    var load_equip = $prefs.valueForKey("bili_load_equip");
    if(user_equip) obj.data["user_equip"] = JSON.parse(user_equip);
    if(load_equip) obj.data["load_equip"] = JSON.parse(load_equip);
    $done({body: JSON.stringify(obj)});
}else {
    $done();
}