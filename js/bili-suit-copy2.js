var body = $response.body;
if (body && body.length < 45) {
    var obj = JSON.parse(body);
    var user_equip = $prefs.valueForKey("bili_user_equip");
    var load_equip = $prefs.valueForKey("bili_load_equip");
    if(user_equip) {
        var user_equip = JSON.parse(user_equip);
        if (user_equip.length === 1) obj.data["user_equip"] = user_equip[0];
        else obj.data["user_equip"] = user_equip[parseInt($.getdata("bili_skin_num") || 1) - 1];
    }
    if(load_equip) {
        var load_equip = JSON.parse(load_equip);
        if (load_equip.length === 1) obj.data["load_equip"] = load_equip[0];
        else obj.data["load_equip"] = load_equip[parseInt($.getdata("bili_load_num") || 1) - 1];
    }
    $done({body: JSON.stringify(obj)});
}else {
    $done();
}