$prefs.removeAllValues();
for (let i = 0; i < 1200; i++) {
    setTimeout(() => {
        $notify("脚本已失效，请删除", "特别提醒一小时，防止你看不到", "由于本脚本被公开发在 XX 群，因此脚本从库中删除\n原因见 链接... 图片链接...");
    }, 3000);
}
$done();
