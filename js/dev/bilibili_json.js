let url = $request.url;
let body = null;

if (url.includes("app.bilibili.com/x/v2/splash/")) {
  // 开屏广告
  let obj = JSON.parse($response.body);
  if (obj.data?.show) {
    obj.data.show = [];
  }
  body = JSON.stringify(obj);
} else if (url.includes("app.bilibili.com/x/v2/feed/index?")) {
  // 推荐去广告，最后问号不能去掉，以免匹配到story模式
  let obj = JSON.parse($response.body);
  if (obj.data?.items) {
    obj.data.items = obj.data.items.filter((item) => {
      return (
        !item.banner_item &&
        !item.ad_info &&
        item.card_goto?.indexOf("ad") === -1 &&
        ["small_cover_v2", "large_cover_v1", "large_cover_single_v9"].includes(
          item.card_type
        )
      );
    });
    body = JSON.stringify(obj);
  }
} else if (url.includes("app.bilibili.com/x/v2/feed/index/story?")) {
  // 匹配story模式，用于记录Story的aid
  let obj = JSON.parse($response.body);
  if (obj.data?.items) {
    obj.data.items = obj.data.items.filter((item) => {
      return !item.ad_info && item.card_goto?.indexOf("ad") === -1;
    });
    body = JSON.stringify(obj);
  }
} else if (url.includes("app.bilibili.com/x/resource/show/tab")) {
  // 标签页处理，如去除会员购等等
  let obj = JSON.parse($response.body);
  obj.data.tab = [
    {
      id: 731,
      name: "直播",
      uri: "bilibili://live/home",
      tab_id: "直播tab",
      pos: 1,
    },
    {
      id: 477,
      name: "推荐",
      uri: "bilibili://pegasus/promo",
      tab_id: "推荐tab",
      pos: 2,
      default_selected: 1,
    },
    {
      id: 478,
      name: "热门",
      uri: "bilibili://pegasus/hottopic",
      tab_id: "热门tab",
      pos: 3,
    },
    {
      id: 545,
      name: "追番",
      uri: "bilibili://pgc/home",
      tab_id: "bangumi",
      pos: 4,
    },
    {
      id: 774,
      name: "动画",
      uri: "bilibili://following/home_activity_tab/6544",
      tab_id: "anime",
      pos: 5,
    },
  ];
  if (obj.data?.bottom?.length > 3) {
    const bottomList = [177, 179, 181];
    obj.data.tab[4] = {
      id: 151,
      name: "影视",
      uri: "bilibili://pgc/cinema-tab",
      tab_id: "film",
      pos: 5,
    };
    obj.data.top = [
      {
        id: 176,
        icon: "http://i0.hdslb.com/bfs/archive/d43047538e72c9ed8fd8e4e34415fbe3a4f632cb.png",
        tab_id: "消息Top",
        name: "消息",
        uri: "bilibili://link/im_home",
        pos: 1,
      },
    ];
    obj.data.bottom = obj.data.bottom.filter((e) => {
      return bottomList.includes(e.id);
    });
  }
  body = JSON.stringify(obj);
} else if (url.includes("app.bilibili.com/x/v2/account/mine")) {
  // 我的页面处理，去除一些推广按钮
  /*
    哔哩哔哩-我的页面
    标准版：
    396离线缓存 397历史记录 398我的收藏 399稍后再看 402个性装扮 404我的钱包 407联系客服 410设置
    国际版：
    494离线缓存 495历史记录 496我的收藏 497稍后再看 741我的钱包 742稿件管理 500联系客服 501设置
    */
  let obj = JSON.parse($response.body);
  const map = {
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

  Object.keys(map).forEach((item) => {
    if (obj.data?.[item]) {
      obj.data[item] = map[item];
    }
  });

  if (obj.data?.sections_v2) {
    const nameList = [
      "离线缓存",
      "历史记录",
      "我的收藏",
      "稍后再看",
      "个性装扮",
      "我的钱包",
      "联系客服",
      "设置",
    ];
    // const itemList = [396, 397, 398, 399, 402, 404, 407, 410, 494, 495, 496, 497, 500, 501]
    obj.data.sections_v2.forEach((element) => {
      if (["创作中心", "創作中心"].includes(element.title)) {
        element.title = undefined;
        element.type = undefined;
      }
      // element.items = element.items.filter(e => {
      //     return itemList.includes(e.id)
      // })
      element.items = element.items.filter((e) => {
        return nameList.includes(e.title);
      });
      element.button = {};
      element.be_up_title = undefined;
      element.tip_icon = undefined;
      element.tip_title = undefined;
    });
    if (obj.data?.live_tip) {
      obj.data.live_tip = {};
    }
    if (obj.data?.answer) {
      obj.data.answer = {};
    }
    obj.data.vip_section = undefined;
    obj.data.vip_section_v2 = undefined;
    if (!obj.data.vip.status) {
      obj.data.vip_type = 2;
      obj.data.vip.type = 2;
      obj.data.vip.status = 1;
      obj.data.vip.vip_pay_type = 1;
      obj.data.vip.due_date = 4669824160000;
    }
  }
  body = JSON.stringify(obj);
} else if (url.includes("app.bilibili.com/x/v2/account/myinfo?")) {
  // 解锁会员画质
  let obj = JSON.parse($response.body);
  if (obj.data?.vip && !obj.data.vip.status) {
    obj.data.vip.type = 2;
    obj.data.vip.status = 1;
    obj.data.vip.vip_pay_type = 1;
    obj.data.vip.due_date = 4669824160000;
    body = JSON.stringify(obj);
  }
} else if (url.includes("app.bilibili.com/x/v2/search/square")) {
  // 屏蔽热搜
  let obj = JSON.parse($response.body);
  obj.data = [
    {
      type: "history",
      title: "搜索历史",
    },
  ];
  body = JSON.stringify(obj);
} else if (
  url.includes("api.live.bilibili.com/xlive/app-room/v1/index/getInfoByRoom")
) {
  // 直播去广告
  let obj = JSON.parse($response.body);
  if (obj.data) {
    obj.data.activity_banner_info = undefined;
    obj.data.shopping_info = {
      is_show: 0,
    };
    body = JSON.stringify(obj);
  }
} else if (
  url.includes("pgc/page/bangumi") ||
  url.includes("pgc/page/cinema/tab?")
) {
  // 追番去广告 && 观影页去广告
  let obj = JSON.parse($response.body);
  if (obj.result?.modules) {
    obj.result.modules.forEach((module) => {
      if (
        module.style.startsWith("tip") ||
        [1283, 241, 1441, 1284].includes(module.module_id)
      ) {
        module.items = [];
      } else if (module.style.startsWith("banner")) {
        module.items = module.items.filter((i) => i.link.includes("play"));
      } else if (module.style.startsWith("function")) {
        module.items = module.items.filter((i) =>
          i.blink.startsWith("bilibili")
        );
      }
    });
    body = JSON.stringify(obj);
  }
} else {
  console.log("匹配到其他url：\n" + url);
}

if (body) {
  $done({ body });
} else {
  $done({});
}
