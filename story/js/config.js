Config.saves.autosave = true; // 自动存档
Config.saves.autoload = true; // 自动读档
Config.history.maxStates = 1; // 可回溯历史数 
Config.history.controls = false; // 不允许UI操作
Config.passages.nobr = true;
Config.saves.isAllowed = function () {
    if (tags().includes('nosave')) {
        console.log('nosave');
        return false;
    }
    return true;
}; // 带nosave标签的passage不自动保存
$(document).on(":passagedisplay", () => {
    State.expired.splice(0, Math.max(State.expired.length - 100, 0));
}); // 限制过期历史数
$(document).one(':storyready', function (ev) {
    if (Save.autosave.has()) {
        console.debug("> Force loading");
        Save.autosave.load(); // 刷新浏览器强制读档
        Engine.play(State.getVar("$gameMap").id);
    }
    // if (Story.get(State.passage).tags.includes("sub")) {
    //     $("#main-menu").toggleClass("hide");
    //     $("#sub-menu").toggleClass("hide");
    } // 如果读档时是对话窗口，需要显示子菜单隐藏主菜单
}); 