if (!setup.map) setup.map = new Object();
setup.map.origin = new Object();

/* 地图ID */
setup.map.origin.id = "mapOrigin"

/* 地图名 */
setup.map.origin.name = "？？？";

/* 地图类型 */
setup.map.origin.type = "field";

/* 地图状态描述 */
setup.map.origin.desc = new Array();
setup.map.origin.desc.push("眼前是一片阳光下的原野。");
setup.map.origin.desc.push("地上长满了草，嫩嫩的、绿绿的，看不到边。");
setup.map.origin.desc.push("你不知道这里是哪里，但显然不是你的房间。");

/* 地图NPC */
setup.map.origin.npc = new Array();
setup.map.origin.npc.push({
  id: "npcOriginGuardian",
  name: "卫兵",
  odds: 100,
  desc: [
      "一名站得笔直的卫兵，身上穿着你没见过的军服，手中拿着一根款式简朴的长枪。",
      "枪尖在阳光下反射着刺眼的光，看起来不像是Cosplay道具。"
    ],
  chat: [{
      question: "这里是哪儿？",
      answer: [
          "你迷路了吗？",
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
          "你不知道吗？",
          "初心者修炼场是免费的冒险者培育设施。如果你也想成为冒险者的话，不妨进去看看。"
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
    "一座中世纪时期的欧洲风格城堡，你只在影视作品里见过。",
    "在你居住的地方不可能有这样的城堡。"
  ],
  pre: function() {
    return State.getVar("$mapOriginToggle2");
  },
  post: function() {

  },
  refuse: "门口站着卫兵，你不敢直接进去。"
});

/* 地图魔物 */
setup.map.origin.mobs = new Array();