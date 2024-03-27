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
  "睁开双眼，你发现自己站在这里——",
  "一片原野，长满了嫩草，一眼看不到边。",
  "太阳懒躺在白云上，向大地倾倒着金黄色。"];

/* 地图NPC */
setup.map.origin.npc = new Array();
setup.map.origin.npc.push({
  id: "npcOriginGuardian",
  name: "卫兵",
  odds: 100,
  desc: [
      "一名年轻的卫兵，穿着你从未见过的制服。",
      "他手中拄着长矛，矛尖反射着刺眼的光。",
      "他的双眼直视着你，但似乎没有敌意。"
    ],
  chat: [{
      question: "请问这里是哪里？",
      answer: [
          "你迷路了吧？",
          "只有迷路的人会来到这里。",
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
          "初心者修炼场是免费的冒险者培育设施。",
          "如果你不知道该去哪儿，不妨进去看看。",
          "至少，教官能指引你走上冒险者的道路。"
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
    "它被护城河环绕，只有一条木桥通往大门。",
    "大门敞开着，有一名卫兵在门外把守。"
  ],
  pre: function() {
    return State.getVar("$mapOriginToggle2");
  },
  post: function() {

  },
  refuse: "门外站着卫兵，你不敢直接进去。"
});

/* 地图魔物 */
setup.map.origin.mobs = new Array();