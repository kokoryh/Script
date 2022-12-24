/*
修改自@ddgksf2013的微博国际版去广告脚本
使趋势页更符合个人使用习惯
*/
const mainConfig = {};
const modifyTimeUrls = ['statuses/friends/timeline', 'statuses/friends_timeline', 'statuses/unread_friends_timeline', 'statuses/unread_hot_timeline'];
const modifyOtherUrls = {
	'ct=feed&a=trends': 'removeTopics',
	'user_center': 'modifiedUserCenter',
	'interface/sdk/sdkad.php': 'removePhpScreenAds',
	'a=get_coopen_ads': 'removeIntlOpenAds'
}
function getModifyMethod(url) {
	for (const s of modifyTimeUrls) {
		if(url.indexOf(s) > -1) {
			return 'removeTimeLine';
		}
	}
	for(const [path, method] of Object.entries(modifyOtherUrls)) {
		if(url.indexOf(path) > -1) {
			return method;
		}
	}
	return null;
}
function removeTopics(data) {
	if(!data.data || data.data.length === 0) {
		return data;
	}
	if(data.data.order) {data.data.order = ["search_topic"]}
	return data;
}
function modifiedUserCenter(data) {
	if(!data.data || data.data.length === 0) {
		return data;
	}
	data.data.cards = Object.values(data.data.cards).filter(item => !(item.items[0].type === 'personal_vip'));
	return data;
}
function removePhpScreenAds(data){
	if(!data.ads || data.ads.length === 0){
		return data;
	}
	data.show_push_splash_ad = false;
	data.background_delay_display_time = 604800;
	data.ads = [];
	return data;
}
function removeIntlOpenAds(data) {
	if(!data.data || data.data.length === 0) {
		return data;
	}
	data.data.ad_list = [];
	data.data.gdt_video_ad_ios = [];
	data.data.display_ad = 0;
	data.data.ad_ios_id = null;
	data.data.app_ad_ios_id = null;
	data.data.reserve_ad_ios_id = "";
	data.data.reserve_app_ad_ios_id = "";
	data.data.ad_duration = 604800;
	data.data.ad_cd_interval = 604800;
	data.data.pic_ad = [];
	return data;
}
function isAd(data) {
	if(!data) {
		return false;
	}
	if(data.mblogtypename == '广告' || data.mblogtypename == '热推') {return true};
	if(data.mblogtypename == '廣告' || data.mblogtypename == '熱推') {return true};
	//if(data.readtimetype  == 'adMblog' && !data.user.following) {return true};
	if(data.promotion && data.promotion.type == 'ad') {return true};
	return false;
}
function isBlock(data) {
	let blockIds = mainConfig.blockIds || [];
	if(blockIds.length === 0) {
		return false;
	}
	let uid = data.user.id;
	for (const blockId of blockIds) {
		if(blockId == uid) {
			return true;
		}
	}
	return false;
}
function removeTimeLine(data) {
	for (const s of ["ad", "advertises", "trends"]) {
		if(data[s]) {
			data[s] = undefined;
		}
	}
	if(!data.statuses) {
		return;
	}
	let newStatuses = [];
	for (const s of data.statuses) {
		if(!isAd(s)) {
			//lvZhouHandler(s);
			if(!isBlock(s)) {
				newStatuses.push(s);
			}
		}
	}
	data.statuses = newStatuses;
}
var body = $response.body;
var url = $request.url;
let method = getModifyMethod(url);
if(method) {
	var func = eval(method);
	if(method === 'removePhpScreenAds') {
		let data = JSON.parse(body.substring(0, body.length - 2));
		new func(data);
		body = JSON.stringify(data) + "OK";
	} else {
		let data = JSON.parse(body);
		new func(data);
		body = JSON.stringify(data);
	}
}
$done({body});
