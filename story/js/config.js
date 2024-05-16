// Config.saves.autosave = true; // 自动存档
// Config.saves.autoload = true; // 自动读档
Config.saves.autosave = false; // 禁止自动存档
Config.saves.slots = 3; // 最大存档数3
Config.history.maxStates = 1; // 可回溯历史数
Config.history.controls = false; // 不允许历史操作
Config.ui.stowBarInitially = true; // 默认收起侧边栏
Config.passages.nobr = true; // 禁止自动换行
Config.saves.isAllowed = function () {
  if (tags().includes('nosave')) {
    console.debug('nosave');
    return false;
  }
  return true;
}; // 带nosave标签的passage不自动保存
$(document).on(':passagedisplay', () => {
  State.expired.splice(0, Math.max(State.expired.length - 100, 0));
  if (!tags().includes('nosave') && passage() != 'Title') {
    Save.slots.save(State.getVar('$saveSlot'), State.getVar('$pcName'));
    console.debug('Auto save to slot ' + State.getVar('$saveSlot'));
    console.debug(Save.slots.get(State.getVar('$saveSlot')));
  } else console.debug('Auto save disabled');
}); // 限制过期历史数
$(document).one(':storyready', function (ev) {
  //   $('html').addClass('mx-auto');
  //   if (Save.autosave.has()) {
  //     console.debug('> Force loading');
  //     Save.autosave.load(); // 刷新浏览器强制读档
  //     if (!tags().includes('cut')) {
  //       Engine.play(setup.map[State.getVar('$gameMapKey')].id);
  //     }
  //   }
});
