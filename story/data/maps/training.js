if (!setup.map) setup.map = new Object();
setup.map.training = new Object();

/* 地图ID */
setup.map.training.id = "mapTraining"

/* 地图名 */
setup.map.training.name = "初心者修炼场";

/* 地图类型 */
setup.map.training.type = "safe";

/* 地图状态描述 */
setup.map.training.desc = [
  "修炼场的内部完全出乎你的意料。",
  "这里几乎没有半点贵族生活的气息。",
  "天空很蓝，是大城市里不可能有的蓝。",
  "睁开双眼时，你就发现自己来到了这里。",
  "你不知道这是哪里，但不可能是你的房间。"];

/* 地图NPC */
setup.map.origin.npc = new Array();
setup.map.origin.npc.push({
  id: "npcOriginGuardian",
  name: "卫兵",
  odds: 100,
  desc: [
      "一名在城门外站得笔直的卫兵。",
      "他的身上穿着你从未见过的军服。",
      "手中拄着的长枪款式简朴，枪尖反射着阳光。",
      "你可以确定这绝对不是Cosplay道具。",
      "这让你感到更加混乱。"  
    ],
  chat: [{
      question: "这里是哪儿？",
      answer: [
          "你也迷路了吗？",
          "最近在这附近迷路的人也太多了。",
          "这里是卢恩·米德加兹王国的初心者修炼场。"
        ],
      pre: function() {
        return true;
      },
      post: function() {
        State.setVar("$mapOriginToggle1", true);
      },
      forwarding: "Chat"
    }, {
      question: "初心者修炼场？",
      answer: [
          "你果然也不知道，和其他迷路的人一样。",
          "初心者修炼场是免费的冒险者培育设施。",
          "如果你也想成为冒险者的话，不妨进去看看。"
        ],
      pre: function() {
        return State.getVar("$mapOriginToggle1");
      },
      post: function() {
        State.setVar("$mapOriginToggle2", true);
      },
      forwarding: "Chat"
    },
  ]
});

/* 地图出入口 */
setup.map.origin.exit = new Array();
setup.map.origin.exit.push({
  id: "mapTraining",
  name: "奇怪的城堡",
  odds: 100,
  desc: [
    "一座中世纪时期的欧洲风格城堡。",
    "你只在影视作品里见过这样的城堡。",
    "它突兀地耸立在原野上，被护城河环绕着。",
    "城门大开，仿佛在欢迎任何人到来。",
    "在你居住的城市里不可能有这样的城堡。"
  ],
  pre: function() {
    return State.getVar("$mapOriginToggle2");
  },
  post: function() {

  },
  refuse: "城门外站着卫兵，让你不敢直接进去。"
});

/* 地图魔物 */
setup.map.origin.mobs = new Array();