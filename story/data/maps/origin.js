if (!setup.map) setup.map = new Object();
setup.map.origin = new Object();

/* 地图ID */
setup.map.origin.id = "mapOrigin"

/* 地图名 */
setup.map.origin.name = "？？？";

/* 地图类型 */
setup.map.origin.type = "field";

/* 地图状态描述 */
setup.map.origin.desc = [
  "睁开双眼，你发现自己来到了这里——",
  "一片原野，长满了嫩草，一眼看不到边。",
  "太阳懒躺在白云上，向大地倾倒着金黄色。"];

/* 地图NPC */
setup.map.origin.npc = new Array();
setup.map.origin.npc.push({
  id: "npcOriginGuardian",
  name: "卫兵",
  odds: 100,
  desc: [
      "一名卫兵站在城门外，目不斜视。",
      "他穿着你没见过的军服，手中拄着长矛。",
      "矛尖反射着阳光，看起来不像Cosplay道具。"
    ],
  chat: [{
      question: "这里是哪儿？",
      answer: [
          "你也迷路了吗？",
          "最近在这附近迷路的人很多。",
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