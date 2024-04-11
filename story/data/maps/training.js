if (!setup.map) setup.map = {};
setup.map.training = {};

/* 地图ID */
setup.map.training.id = 'mapTraining';

/* 地图key */
setup.map.training.key = 'training';

/* 地图名 */
setup.map.training.name = '初心者修炼场';

/* 地图类型 */
setup.map.training.type = 'safe';

/* 地图状态描述 */
setup.map.training.desc = [
  '修炼场里只有你的脚步声在回响。',
  '大厅有五六十步长宽，没有任何家具或摆设。',
  '只有一个男人站在正中央，定定地看着你。'
];

/* 地图NPC */
setup.map.training.npc = [];
setup.map.training.npc.push({
  id: 'npcTrainingInstructor',
  name: '教官',
  odds: 100,
  desc: [
    '一名穿着链甲、背着巨剑的中年男人。',
    '他肌肉虬张，面容刚硬，脸上却挂着笑。',
    '「欢迎。我是这里的教官。」他对你说。'
  ],
  chat: [
    {
      question: '我迷路了。',
      answer: [
        '我见过很多迷路来到这里的人。',
        '他们都忘了自己是怎么来到这里的。',
        '你应该也跟他们一样。'
      ],
      pre: function () {
        return !State.getVar('$mapTrainingToggle1');
      },
      post: function () {
        State.setVar('$mapTrainingToggle1', true);
      },
      forwarding: 'Chat'
    },
    {
      question: '他们后来怎么样？',
      answer: [
        '我没有办法送他们回到各自的归处，',
        '只能教给他们寻找归处的知识和能力。',
        '他们都成为了探险者，没有人再回来这里。'
      ],
      pre: function () {
        return (
          State.getVar('$mapTrainingToggle1') &&
          !State.getVar('$mapTrainingToggle2')
        );
      },
      post: function () {
        State.setVar('$mapTrainingToggle2', true);
      },
      forwarding: 'Chat'
    },
    {
      question: '我也想寻找我的归处。',
      answer: [
        '那就加入他们吧。',
        '你们的归处，说不定在同一个地方。',
        '我会尽我所能，让你成为优秀的冒险者。'
      ],
      pre: function () {
        return (
          State.getVar('$mapTrainingToggle2') &&
          !State.getVar('$mapTrainingToggle3')
        );
      },
      post: function () {
        State.setVar('$mapTrainingToggle3', true);
      },
      forwarding: 'Chat'
    },
    {
      question: '我该怎么做？',
      answer: [
        '探险者的成就基本取决于五个基础条件:',
        '身体、知识、物资、技术、精神。缺一不可。',
        '我会教你提升基础条件的方法，从身体开始。',
        '&nbsp;',
        '<span class="yellow">在【更多】——【素质】分配潜能点。</span>'
      ],
      pre: function () {
        return (
          State.getVar('$mapTrainingToggle3') && State.getVar('$statLv') != 1
        );
      },
      post: function () {
        if (State.getVar('$statLv') == 0) {
          $('#messages-container').empty();
          $('#messages-container').append(
            '<span class="pure-u-1 yellow">你的等级提升至 1 级。</span>'
          );
          $('#messages-container').append(
            '<span class="pure-u-1 yellow">你得到了 3 潜能点。</span>'
          );
          State.setVar('$statLv', 1);
        }
      },
      forwarding: 'Chat'
    },
    {
      question: '我明白了。',
      answer: [
        '身体是一切的根本，',
        '会随着你的探险活动而变得更强。',
        '剩下的部分，我们换个地方再讲。跟我来。',
        '&nbsp;',
        '<span class="yellow">跟随教官前往【储藏室】。</span>'
      ],
      pre: function () {
        return (
          State.getVar('$statLv') == 1 &&
          setup.stat.getPoint() == 0 &&
          !State.getVar('$mapTrainingToggle4')
        );
      },
      post: function () {
        State.setVar('$mapTrainingToggle4', true);
      },
      forwarding: 'Chat'
    }
  ]
});

/* 地图出入口 */
setup.map.training.exit = [];
setup.map.training.exit.push({
  id: 'mapTrainingBoxRoom',
  name: '储藏室',
  odds: 0,
  desc: [
    '大厅一侧有一扇半开着的门。',
    '透过门缝，你看到地上放了几排木架。',
    '你看不见房间的尽头。'
  ],
  pre: function () {
    return State.getVar('$mapTrainingToggle4');
  },
  post: function () {},
  refuse: '在得到允许前，还是不要擅自进入。'
});

/* 地图魔物 */
setup.map.training.mobs = [];
