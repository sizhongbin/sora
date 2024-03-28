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
      question: "我好像迷路了。",
      answer: [
          "对，你迷路了。",
          "我见过很多像你一样迷路的人。",
          "我指导他们成为冒险者，寻找回去的路。"
        ],
      pre: function() {
        return true;
      },
      post: function() {
        State.setVar("$mapTrainingToggle1", true);
      },
      forwarding: "Chat"
    }, {
      question: "我也能当冒险者吗？",
      answer: [
          "只要你想，我就可以指导你。",
          "放心，我的指导不是什么长篇大论。",
          "话不过三是这片大陆的传统美德，呵呵。"
        ],
      pre: function() {
        return State.getVar("$mapTrainingToggle1");
      },
      post: function() {
        State.setVar("$mapTrainingToggle2", true);
      },
      forwarding: "Chat"
    }, {
      question: "请你指导我。",
      answer: [
          "如你所愿。",
          "在你决定前行时，你已经有了成长。",
          "我会先指导你如何激发你的潜能。",
          "&nbsp;",
          "提示：请通过【更多】——【素质点】菜单分配潜能。"
        ],
      pre: function() {
        return State.getVar("$mapTrainingToggle2");
      },
      post: function() {
        $("#messages-container").empty();
        $("#messages-container").append("<span class=\"pure-u-1 yellow\">你升级了。</span>");
        $("#messages-container").append("<span class=\"pure-u-1 yellow\">你得到了 3 点潜能。</span>");   
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