# 素质

- 等级上限：50
- 可加点初始为3，每级给3，50*3=150
- 素质点初始为0，上限70，可加满两项70+70+10，或60+60+30。
- 技能效果全部依存于素质点，武器也只增加素质依存，1级1点，2级2点，3级3点，4级4点
- 精炼+10直接乘算。4级成功几率100 100 100 100 90 80 70 60 50 40。3级100 100 100 100 100 90 80 70 60 50。以此类推。
- STR：
  - 每1点加1WT。
- AGI：
  - 每1点加1AP。
- VIT：
  - 每1点加1HP。
- INT：
  - 每1点加1SP。
- DEX：
  - 每1点加1DP。
- LUK：
  - 每1点加1%暴击率。
- 组队奖励：每多一个人掉率/经验+100%，且独立计算掉率和经验。
- AP行动点初始30，不足消耗时不可用。
- DP延迟点初始30，消耗大于MAX可变负数，负数表示咏唱中。每回合恢复MAX值，恢复至非负数的回合释放。负数时被攻击会被打断咏唱。
- HP初始30
- SP初始30
- 回避率：25+自AGI+等级差-敌DEX，不能低于5，不能高于95
- 命中率：75+自DEX+等级差-敌AGI，不能低于5，不能高于95
- 物伤：伤害-VIT-等级差，不得低于1
- 法伤：伤害-INT-等级差，不得低于1
- WT初始30
- Crit初始5

# Boss战组队思路

选择是否联机
是-看房间或建房间
等人？直接开打？期间别人随时能进？
HP变化时post
每回合指令后行动前Get剩余hp、共斗清单、队友支援，执行支援
10秒没有行动自动Get、执行？
掉落物随机分配（考虑辅助职业）

服务器：
cloudflares支持tcp连接。
考虑实现预约制，预约房间，暂定半小时结束，10分钟内不开战自动取消预约且入黑名单，同一天不可多次预约。

睡眠时间：主角7小时（420分钟），深睡2小时（120分钟），考虑入梦境时间300分钟（60个5分钟），各种行为减少对应时间。



代码备份

:: Start
<<set $game_location to "你的房间">>
<<set $game_time_left to "---">>
<<set $game_time_max to "---">>
<<set $game_network to "离线">>
<<goto "0-1">>

:: 0-1
<<type 40ms>>你忽然睁开双眼。<</type>>
<<run setup.setContinue("0-2")>>

:: 0-2
<<type 40ms>>天似乎还没亮，房间里只有朦胧的微光。
现在几点了？<</type>>
<<run setup.setMainMenu([{title:"找手机",goto:"1"}])>>

:: 1
<<type 40ms>>你点亮手机屏幕，上面显示着06:00。
时间还早。再睡会儿吧。<</type>>
<<run setup.setMainMenu([{title:"睡觉",goto:"2-1"}])>>

:: 2-1
<<type 40ms>>……<</type>>
<<run setup.setContinue("2-2")>>

:: 2-2
<<type 40ms>>…………<</type>>
<<run setup.setContinue("2-3")>>

:: 2-3
<<type 40ms>>………………<</type>>
<<run setup.setContinue("2-4")>>

:: 2-4
<<type 40ms>>你感觉脑袋异常清醒，完全睡不着。
今天就早点起床吧。<</type>>
<<run setup.setMainMenu([{title:"起床",goto:"3-1"}])>>

:: 3-1
<<type 40ms>>站起来的瞬间，
你就意识到自己大概正在做梦。<</type>>
<<set $game_location to "？？？">>
<<run setup.setContinue("3-2")>>

:: 3-2
<<type 40ms>>你的眼前是一片阳光下的原野。
地上长满了草，嫩嫩的、绿绿的，看不到边。<</type>>
<<run setup.setContinue("3-3")>>

:: 3-3
<<type 40ms>>你被吓得够呛，想坐回床上，却坐了空气。
你猝不及防，摔了个四仰八叉。<</type>>
<<run setup.setContinue("3-4")>>

:: 3-4
<<type 40ms>>然而你几乎没感觉到疼，
背后传来的，是草地柔软的触感。<</type>>
<<run setup.setContinue("3-5")>>

:: 3-5
<<type 40ms>>这时，你才迟钝地发现，
身上的睡衣裤已不知何时变成了朴素的棉衣裤。<</type>>
<<run setup.setContinue("3-6")>>

:: 3-6
<<type 40ms>>你使劲儿掐了自己一下，感觉很疼。
你愣愣地看着蔚蓝的天空，
这波怕不是穿越了吧？<</type>>
<<set $genericCounter1 to 0>>
<<run setup.setMainMenu([{title:'探索',goto:'4-1'},{title:'躺平',goto:'4-2'}])>>

:: 4-1
<<type 40ms>>你随便挑了一个方向前进。
不知走了多久，眼前的景色没有任何变化，也没见着其他人。<</type>>
<<set $genericCounter1 += 1>>
<<if $genericCounter1 lt 2>>
  <<run setup.setMainMenu([{title:'躺平',goto:'4-2'}])>>
<<else>>
  <<run setup.setContinue("4-3")>>
<</if>>

:: 4-2
<<type 40ms>>你躺平在草地上，
脑子里想着一些有的没的，
心情时悲时喜，不知躺了多久。<</type>>
<<set $genericCounter1 += 1>>
<<if $genericCounter1 lt 2>>
  <<run setup.setMainMenu([{title:'探索',goto:'4-1'}])>>
<<else>>
  <<run setup.setContinue("4-3")>>
<</if>>

:: 4-3
<<type 40ms>>耳边忽然传来熟悉的手机闹铃声。
你正想去找，手机已经自己出现在了你的手上。<</type>>
<<set $genericCounter1 to 0>>
<<run setup.setContinue("4-4")>>

:: 4-4
<<type 40ms>>7点，是你设定的每日重复闹钟时间。
你下意识地点了停止。<</type>>
<<run setup.setContinue("4-5")>>

:: 4-5
<<type 40ms>>朦胧的微光重新占据了整个空间。
蓝天消失了，原野也消失了。<</type>>
<<run setup.setContinue("4-6")>>

:: 4-6
<<type 40ms>>你睁着双眼，
眼前毫无疑问是你熟悉的房间。<</type>>
<<set $game_location to "你的房间">>
<<run setup.setContinue("4-7")>>

:: 4-7
<<type 40ms>>穿越？穿个球啊！
你用脚趾头使劲儿抠着床垫，
脸上一阵火烧。<</type>>
<<run setup.setContinue("4-8")>>

:: 4-8
<<type 40ms>>梦醒了。
该上班了。<</type>>
<<run setup.setMainMenu([{title:'上班',goto:'5'}])>>

:: 5
<<type 40ms>>打工人的日常，不值一提。
下班了，要干点什么？<</type>>
<<run setup.setMainMenu([{title:'待续',goto:'5'}])>>

:: Vending [nosave]
<<run setup.setMainMenu()>>露天商店



    setup.setMainMenu([
        {
            title: "探索",
            func: function () {
                alert('探索');
            }
        },
        {
            title: "对话",
            func: function () {
                setup.clearMenu();
                setup.setSubMenu([
                {
                    title: "卫兵",
                    func: function () {
                        alert('卫兵');
                    }
                }
                ], "origin")
            }
        },
        {
            title: "移动",
            func: function () {
                alert('移动');
            }
        },
    ]);