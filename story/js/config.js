Config.saves.autosave = true; // 自动存档
Config.saves.autoload = true; // 自动读档
Config.history.maxStates = 1; // 可回溯历史数 
Config.history.controls = false; // 不允许UI操作
$(document).on(":passagedisplay", () => {
    State.expired.splice(0, Math.max(State.expired.length - 100, 0));
}); // 限制过期历史数