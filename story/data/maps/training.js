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
  "城堡内部没有半点生活气息。",
  "大厅比篮球场还大，没有任何家具或摆设。",
  "只有一个男人站在大厅的正中央。"
  ];

/* 地图NPC */
setup.map.training.npc = new Array();
setup.map.training.npc.push({
  id: "npcTrainingInstructor",
  name: "教官",
  odds: 100,
  desc: [
      "一名穿着链甲、背着巨剑的中年男人。",
      "他肌肉虬张，面容刚硬，表情却很柔和。",
      "「欢迎。我是这里的教官。」他说。",
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
        State.setVar("$mapTrainingToggle1", true);
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
        return State.getVar("$mapTrainingToggle1");
      },
      post: function() {
        State.setVar("$mapTrainingToggle2", true);
      },
      forwarding: "Chat"
    },
  ]
});

/* 地图出入口 */
setup.map.training.exit = new Array();
setup.map.training.exit.push({
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
    return State.getVar("$mapTrainingToggle2");
  },
  post: function() {

  },
  refuse: "城门外站着卫兵，让你不敢直接进去。"
});

/* 地图魔物 */
setup.map.training.mobs = new Array();