if (!setup.map) setup.map = new Object();
setup.map.origin = new Object();

/* 地图ID */
setup.map.origin.id = "MapOrigin"

/* 地图名 */
setup.map.origin.name = "？？？";

/* 地图类型 */
setup.map.origin.type = "field";

/* 地图状态描述 */
setup.map.origin.status = new Array();
setup.map.origin.status.push("眼前是一片阳光下的原野。");
setup.map.origin.status.push("地上长满了草，嫩嫩的、绿绿的，看不到边。");
setup.map.origin.status.push("你不知道这里是哪里，但显然不是你的房间。");

/* 地图NPC */
setup.map.origin.npc = new Array();
setup.map.origin.npc.push({
  title: "卫兵",
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
        State.setVar("$map_OriginToggle1", true);
      },
      forwarding: "Chat"
    }, {
      question: "初心者修炼场？",
      answer: [
          "你不知道吗？",
          "初心者修炼场是免费的冒险者培育设施。如果你也想成为冒险者的话，不妨进去看看。"
        ],
      pre: function() {
        return State.getVar("$map_OriginToggle1");
      },
      post: function() {

      },
      forwarding: "Chat"
    },
  ]
});

/* 地图出入口 */
setup.map.origin.exit = new Array();
setup.map.origin.exit.push({
  title: "奇怪的城堡",
  passage: "Training",
  odds: 100
});

/* 地图魔物 */
setup.map.origin.mobs = new Array();