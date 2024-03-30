setup.stat = new Object();

setup.stat.getPoint = function () {
    let lv = State.getVar("$statLv");
    let str = State.getVar("$statStr");
    let agi = State.getVar("$statAgi");
    let vit = State.getVar("$statVit");
    let int = State.getVar("$statInt");
    let dex = State.getVar("$statDex");
    let luk = State.getVar("$statLuk");
    let point = lv * 3 - str - agi - vit - int - dex - luk;
    console.debug(`getPoint: ${lv} * 3 - STR${State.getVar("$statStr")} - AGI${State.getVar("$statAgi")} - VIT${State.getVar("$statVit")} - INT${State.getVar("$statInt")} - DEX${State.getVar("$statDex")} - LUL${State.getVar("$statLuk")}`);
    return point;
}

setup.stat.getStatMod = function() {
  let statMod = { str: 0, agi: 0, vit: 0, int: 0, dex: 0, luk: 0, wt: 0, ap: 0, hp: 0, sp: 0, cp: 0, cri: 0};
  return statMod;
}

setup.stat.getMaxHp = function () {
    let maxHp = 30 + State.getVar("$statVit") + setup.stat.getStatMod().vit;
    return maxHp;
}

setup.stat.getMaxSp = function () {
    let maxSp = 30 + State.getVar("$statInt") + setup.stat.getStatMod().int;
    return maxSp;
}

setup.stat.getMaxAp = function () {
    let maxAp = 30 + State.getVar("$statAgi") + setup.stat.getStatMod().agi;
    return maxAp;
}

setup.stat.getMaxCp = function () {
    let maxCp = 30 + State.getVar("$statDex") + setup.stat.getStatMod().dex;
    return maxCp;
}

setup.stat.getMaxWt = function () {
    let maxWt = 30 + State.getVar("$statStr") + setup.stat.getStatMod().str;
    return maxWt;
}

setup.stat.getCri = function () {
    let cri = 5 + State.getVar("$statLuk") + setup.stat.getStatMod().luk;
    return cri;
}

setup.stat.getMaxFp = function () {
    return 300;
}