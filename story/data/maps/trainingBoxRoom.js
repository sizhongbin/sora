if (!setup.map) setup.map = {};
setup.map.trainingBoxRoom = {};

/* 地图ID */
setup.map.trainingBoxRoom.id = 'mapTrainingBoxRoom';

/* 地图key */
setup.map.trainingBoxRoom.key = 'trainingBoxRoom';

/* 地图名 */
setup.map.trainingBoxRoom.name = '储藏室';

/* 地图类型 */
setup.map.trainingBoxRoom.type = 'safe';

/* 地图状态描述 */
setup.map.trainingBoxRoom.desc = [
  '跟大厅几乎一般大的空间里摆满了木架，',
  '存放着制式短剑、服装和格式用品。',
  '有几个木架已经空了，但没有落灰。'
];

/* 地图NPC */
setup.map.trainingBoxRoom.npc = [];
setup.map.trainingBoxRoom.npc.push({
  id: 'npcTrainingBoxRoomInstructor',
  name: '教官',
  odds: 100,
  desc: [
    '教官随手拿起了一柄制式短剑。',
    '他将短剑。',
    '「欢迎。我是这里的教官。」他说。'
  ],
  chat: [
    {
      question: '我好像迷路了。',
      answer: [
        '对，你迷路了。',
        '我见过很多像你一样迷路的人。',
        '我指导他们成为冒险者，寻找回去的路。'
      ],
      pre: function () {
        return true;
      },
      post: function () {
        State.setVar('$mapTrainingToggle1', true);
      },
      forwarding: 'Chat'
    },
    {
      question: '我也能当冒险者吗？',
      answer: [
        '只要你想，我就可以指导你。',
        '放心，我的指导不是什么长篇大论。',
        '话不过三是这片大陆的传统美德，呵呵。'
      ],
      pre: function () {
        return State.getVar('$mapTrainingToggle1');
      },
      post: function () {
        State.setVar('$mapTrainingToggle2', true);
      },
      forwarding: 'Chat'
    },
    {
      question: '我想！',
      answer: [
        '如你所愿。',
        '保持好这种决心，它会激发你的潜能。',
        '首先，我会指导你如何利用你的潜能。',
        '&nbsp;',
        '提示：请通过【更多】——【素质】分配潜能点。'
      ],
      pre: function () {
        return State.getVar('$mapTrainingToggle2');
      },
      post: function () {
        if (State.getVar('$statLv') == 0) {
          $('#messages-container').empty();
          $('#messages-container').append(
            '<span class="pure-u-1 yellow">你升级了。</span>'
          );
          $('#messages-container').append(
            '<span class="pure-u-1 yellow">你得到了 3 点潜能。</span>'
          );
          State.setVar('$statLv', 1);
        }
      },
      forwarding: 'Chat'
    },
    {
      question: '我感觉变强了！',
      answer: [
        '身体素质是冒险的基础。',
        '接下来，兵马未动，粮草先行。',
        '跟我来，我会指导你进行冒险前的整备。',
        '&nbsp;',
        '提示：请前往【储藏室】。'
      ],
      pre: function () {
        if (State.getVar('$statLv') == 1 && setup.stat.getPoint() == 0)
          return true;
        else return false;
      },
      post: function () {
        State.setVar('$mapTrainingToggle3', true);
      },
      forwarding: 'Chat'
    }
  ]
});

/* 地图出入口 */
setup.map.trainingBoxRoom.exit = [];
setup.map.trainingBoxRoom.exit.push({
  id: 'mapTrainingBoxroom',
  name: '储藏室',
  odds: 0,
  desc: [
    '一个几乎跟大厅一般大的空间。',
    '里面似乎存放了各式物品。',
    '单以储藏室而言，面积有点过于庞大。'
  ],
  pre: function () {
    return State.getVar('$mapTrainingToggle3');
  },
  post: function () {},
  refuse: '在得到允许前，还是不要擅自进入。'
});

/* 地图魔物 */
setup.map.trainingBoxRoom.mobs = [];
