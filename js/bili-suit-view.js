var user_equip = JSON.parse($.getdata("bili_user_equip") || '[]');
var load_equip = JSON.parse($.getdata("bili_load_equip") || '[]');
var suit_view = "--------主题编号, 名称, ID--------\n";
for(let i = 0; i < user_equip.length; i++) {
    suit_view += `${i + 1}, ${user_equip[i].name}, ${user_equip[i].id}\n`;
}
suit_view += "--------加载动画编号, 名称, ID--------\n";
for(let i = 0; i < load_equip.length; i++) {
    suit_view += `${i + 1}, ${load_equip[i].name}, ${load_equip[i].id}\n`;
}
suit_view = suit_view.substring(0, suit_view.length - 1);
$.setdata(suit_view, "bili_suit_view");
