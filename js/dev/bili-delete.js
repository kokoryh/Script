let $ = kokoryh();

if ($.isQuanX) {
    $.removeValue("all");
}

if ($.isSurge) {
    $.removeValue("bili_suit_push");
    $.removeValue("bili_no_load");
    $.removeValue("bili_suit_view");
    $.removeValue("bili_skin_num");
    $.removeValue("bili_load_num");
    $.removeValue("bili_suit");
    $.removeValue("bili_user_equip");
    $.removeValue("bili_load_equip");
}

for (let i = 0; i < 1200; i++) {
    setTimeout(() => {
        $.notify("脚本已失效，请删除", "特别提醒一小时，防止你看不到", "由于本脚本被公开发在 XX 群，因此脚本从库中删除\n原因见 链接... 图片链接...");
    }, 3000);
}
$done();

function kokoryh() {
    const isQuanX = 'undefined' !== typeof $task;
    const isSurge = 'undefined' !== typeof $httpClient;
    const notify = (title, subtitle, message) => {
        if (isQuanX) $notify(title, subtitle, message);
        if (isSurge) $notification.post(title, subtitle, message);
    }
    const removeValue = (key) => {
        if (isQuanX) return $prefs.removeAllValues();
        if (isSurge) return $persistentStore.write("", key);
    }
    return {
        isQuanX,
        isSurge,
        notify,
        removeValue
    }
}
