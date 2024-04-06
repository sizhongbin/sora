setup.battle = {};
setup.battle.getHit = function (enemyLv, enemyAgi) {
    let lv = State.getVar("$statLv");
    let dex = State.getVar("$statDex") + setup.stat.getStatMod().dex;
    let rawHit = 75 + dex + lv - enemyLv - enemyAgi;
    console.debug(`rawHit: 75 + dex${dex} + lv${lv} - enemyLv${enemyLv} - enemyAgi${enemyAgi}`);
    let finalHit = Math.max(Math.min(5, rawHit), 95);
    console.debug(`finalHit: ${finalHit}`);
    return finalHit;
};

setup.battle.getFlee = function (enemyLv, enemyDex) {
    let lv = State.getVar("$statLv");
    let agi = State.getVar("$statAgi") + setup.stat.getStatMod().agi;
    let rawFlee = 25 + agi + lv - enemyLv - enemyDex;
    console.debug(`rawFlee: 25 + agi${agi} + lv${lv} - enemyLv${enemyLv} - enemyDex${enemyDex}`);
    let finalFlee = Math.max(Math.min(5, rawFlee), 95);
    console.debug(`finalFlee: ${finalFlee}`);
    return finalFlee;
};