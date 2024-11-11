try {
    const url = $request.url;
    let body = $response.body;
    if (!body) $done({});
    body = JSON.parse(body);

    const routeHandlerMap = {
        "resource/show/tab/v2": handleLayout,
        "v2/splash/": handleSplash,
        "feed/index?": handleFeedIndex,
        "feed/index/story?": handleFeedIndexStory,
        "account/mine": handleAccountMine,
        "account/myinfo": handleAccountMyInfo,
    };

    for (let route in routeHandlerMap) {
        if (url.includes(route)) {
            routeHandlerMap[route](body);
            break;
        }
    }
} catch (e) {
    console.log(e.toString());
} finally {
    $done({});
}

function handleLayout(body) {
    body.data.tab = [
        {
            pos: 1,
            id: 731,
            name: "直播",
            tab_id: "直播tab",
            uri: "bilibili://live/home",
        },
        {
            pos: 2,
            id: 477,
            name: "推荐",
            tab_id: "推荐tab",
            uri: "bilibili://pegasus/promo",
            default_selected: 1,
        },
        {
            pos: 3,
            id: 478,
            name: "热门",
            tab_id: "热门tab",
            uri: "bilibili://pegasus/hottopic",
        },
        {
            pos: 4,
            id: 545,
            name: "追番",
            tab_id: "bangumi",
            uri: "bilibili://pgc/home",
        },
        {
            pos: 5,
            id: 774,
            name: "动画",
            tab_id: "anime",
            uri: "bilibili://following/home_activity_tab/6544",
        },
    ];
    body.data.top = [
        {
            pos: 1,
            id: 176,
            name: "消息",
            tab_id: "消息Top",
            uri: "bilibili://link/im_home",
            icon: "http://i0.hdslb.com/bfs/archive/d43047538e72c9ed8fd8e4e34415fbe3a4f632cb.png",
        },
    ];
    if (body.data.bottom?.length > 3) {
        body.data.tab[4] = {
            id: 151,
            name: "影视",
            tab_id: "film",
            uri: "bilibili://pgc/cinema-tab",
            pos: 5,
        };
        const bottomList = ["首页", "动态", "我的"];
        body.data.bottom = body.data.bottom.filter((e) =>
            bottomList.includes(e.name)
        );
    }
    $done({ body: JSON.stringify(body) });
}

function handleSplash(body) {
    ["show", "event_list"].forEach(key => {
        if (body.data?.[key]) {
            body.data[key] = [];
        }
    })
    $done({ body: JSON.stringify(body) });
}

function handleFeedIndex(body) {
    if (Array.isArray(body.data.items)) {
        body.data.items = body.data.items.filter((item) => {
            return (
                !item.banner_item &&  // 移除头部banner
                !item.ad_info &&
                !item.card_goto?.startsWith("ad") &&
                ["small_cover_v2", "large_cover_single_v9", "large_cover_v1"].includes(  // 前两种为ios类型，后一种为平板类型
                    item.card_type
                )
            );
        });
    }
    $done({ body: JSON.stringify(body) });
}

function handleFeedIndexStory(body) {
    if (Array.isArray(body.data.items)) {
        body.data.items = body.data.items.filter((item) => {
            return !item.ad_info && !item.card_goto?.startsWith("ad");
        });
    }
    $done({ body: JSON.stringify(body) });
}

function handleAccountMine(body) {
    const sectionMap = {
        sections_v2: [
            {
                items: [
                    {
                        id: 396,
                        title: "离线缓存",
                        uri: "bilibili://user_center/download",
                        icon: "http://i0.hdslb.com/bfs/archive/5fc84565ab73e716d20cd2f65e0e1de9495d56f8.png",
                        common_op_item: {},
                    },
                    {
                        id: 397,
                        title: "历史记录",
                        uri: "bilibili://user_center/history",
                        icon: "http://i0.hdslb.com/bfs/archive/8385323c6acde52e9cd52514ae13c8b9481c1a16.png",
                        common_op_item: {},
                    },
                    {
                        id: 3072,
                        title: "我的收藏",
                        uri: "bilibili://user_center/favourite",
                        icon: "http://i0.hdslb.com/bfs/archive/d79b19d983067a1b91614e830a7100c05204a821.png",
                        common_op_item: {},
                    },
                    {
                        id: 2830,
                        title: "稍后再看",
                        uri: "bilibili://user_center/watch_later_v2",
                        icon: "http://i0.hdslb.com/bfs/archive/63bb768caa02a68cb566a838f6f2415f0d1d02d6.png",
                        need_login: 1,
                        common_op_item: {},
                    },
                ],
                style: 1,
                button: {},
            },
            {
                title: "推荐服务",
                items: [
                    {
                        id: 402,
                        title: "个性装扮",
                        uri: "https://www.bilibili.com/h5/mall/home?navhide=1&f_source=shop&from=myservice",
                        icon: "http://i0.hdslb.com/bfs/archive/0bcad10661b50f583969b5a188c12e5f0731628c.png",
                        common_op_item: {},
                    },
                    {
                        id: 622,
                        title: "会员购",
                        uri: "bilibili://mall/home",
                        icon: "http://i0.hdslb.com/bfs/archive/19c794f01def1a267b894be84427d6a8f67081a9.png",
                        common_op_item: {},
                    },
                    {
                        id: 404,
                        title: "我的钱包",
                        uri: "bilibili://bilipay/mine_wallet",
                        icon: "http://i0.hdslb.com/bfs/archive/f416634e361824e74a855332b6ff14e2e7c2e082.png",
                        common_op_item: {},
                    },
                ],
                style: 1,
                button: {},
            },
            {
                title: "更多服务",
                items: [
                    {
                        id: 407,
                        title: "联系客服",
                        uri: "bilibili://user_center/feedback",
                        icon: "http://i0.hdslb.com/bfs/archive/7ca840cf1d887a45ee1ef441ab57845bf26ef5fa.png",
                        common_op_item: {},
                    },
                    {
                        id: 410,
                        title: "设置",
                        uri: "bilibili://user_center/setting",
                        icon: "http://i0.hdslb.com/bfs/archive/e932404f2ee62e075a772920019e9fbdb4b5656a.png",
                        common_op_item: {},
                    },
                ],
                style: 2,
                button: {},
            },
        ],
        ipad_sections: [
            {
                id: 747,
                title: "离线缓存",
                uri: "bilibili://user_center/download",
                icon: "http://i0.hdslb.com/bfs/feed-admin/9bd72251f7366c491cfe78818d453455473a9678.png",
                mng_resource: {
                    icon_id: 0,
                    icon: "",
                },
            },
            {
                id: 748,
                title: "历史记录",
                uri: "bilibili://user_center/history",
                icon: "http://i0.hdslb.com/bfs/feed-admin/83862e10685f34e16a10cfe1f89dbd7b2884d272.png",
                mng_resource: {
                    icon_id: 0,
                    icon: "",
                },
            },
            {
                id: 749,
                title: "我的收藏",
                uri: "bilibili://user_center/favourite",
                icon: "http://i0.hdslb.com/bfs/feed-admin/6ae7eff6af627590fc4ed80c905e9e0a6f0e8188.png",
                mng_resource: {
                    icon_id: 0,
                    icon: "",
                },
            },
            {
                id: 750,
                title: "稍后再看",
                uri: "bilibili://user_center/watch_later",
                icon: "http://i0.hdslb.com/bfs/feed-admin/928ba9f559b02129e51993efc8afe95014edec94.png",
                mng_resource: {
                    icon_id: 0,
                    icon: "",
                },
            },
        ],
        ipad_upper_sections: [
            {
                id: 752,
                title: "创作首页",
                uri: "/uper/homevc",
                icon: "http://i0.hdslb.com/bfs/feed-admin/d20dfed3b403c895506b1c92ecd5874abb700c01.png",
                mng_resource: {
                    icon_id: 0,
                    icon: "",
                },
            },
        ],
        ipad_recommend_sections: [
            {
                id: 755,
                title: "我的关注",
                uri: "bilibili://user_center/myfollows",
                icon: "http://i0.hdslb.com/bfs/feed-admin/fdd7f676030c6996d36763a078442a210fc5a8c0.png",
                mng_resource: {
                    icon_id: 0,
                    icon: "",
                },
            },
            {
                id: 756,
                title: "我的消息",
                uri: "bilibili://link/im_home",
                icon: "http://i0.hdslb.com/bfs/feed-admin/e1471740130a08a48b02a4ab29ed9d5f2281e3bf.png",
                mng_resource: {
                    icon_id: 0,
                    icon: "",
                },
            },
        ],
        ipad_more_sections: [
            {
                id: 763,
                title: "我的客服",
                uri: "bilibili://user_center/feedback",
                icon: "http://i0.hdslb.com/bfs/feed-admin/7801a6180fb67cf5f8ee05a66a4668e49fb38788.png",
                mng_resource: {
                    icon_id: 0,
                    icon: "",
                },
            },
            {
                id: 764,
                title: "设置",
                uri: "bilibili://user_center/setting",
                icon: "http://i0.hdslb.com/bfs/feed-admin/34e8faea00b3dd78977266b58d77398b0ac9410b.png",
                mng_resource: {
                    icon_id: 0,
                    icon: "",
                },
            },
        ],
    };

    Object.keys(sectionMap).forEach((key) => {
        if (body.data[key]) {
            body.data[key] = sectionMap[key];
        }
    });

    delete body.data.answer;
    delete body.data.live_tip;
    delete body.data.vip_section;
    delete body.data.vip_section_v2;

    if (body.data.vip && !body.data.vip.status) {
        body.data.vip_type = 2;
        Object.assign(body.data.vip, {
            status: 1,
            type: 2,
            vip_pay_type: 1,
            due_date: 4669824160000,
        });
    }
    $done({ body: JSON.stringify(body) });
}

function handleAccountMyInfo(body) {
    if (body.data.vip && !body.data.vip.status) {
        Object.assign(body.data.vip, {
            status: 1,
            type: 2,
            vip_pay_type: 1,
            due_date: 4669824160000,
        });
    }
    $done({ body: JSON.stringify(body) });
}
