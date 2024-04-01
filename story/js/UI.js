/*
 * 设置Loading效果
 */
setup.setLoading = function (toggle = true) {
  if (toggle) $('html').attr('data-init', 'loading');
  else $('html').removeAttr('data-init');
}











/*
 * 清空菜单
 */
setup.clearMenu = function () {
  $('.main-menu-box').off('click');
  $('.main-menu-box').html('');
  $('.main-menu-box').css('visibility', 'hidden');
  $('.sub-menu-box').off('click');
  $('#sub-menu-container').html('');
  $('#sub-menu-container').css('visibility', 'hidden');
}

/*
 * 设置继续按钮，放在一级菜单末尾
 */
setup.setContinue = function (goto) {
  $(document).on(':typingstop', function () {
    $(document).off(':typingstop');
    console.log(goto);
    $('#menu-5').html('继续');
    $('#menu-5').on('click', function () {
      setup.clearMenu();
      Engine.play(goto);
    });
    $('#menu-5').css('visibility', 'visible');
  });
}

/*
 * 设置一级菜单按钮，不可返回
 */
setup.setMainMenu = function (menuObjs = 0) {
  console.log(menuObjs);
  if (menuObjs == 0) {
    console.log('setMainMenu for Test')
    $('#menu-4').html('Back');
    $('#menu-4').on('click', function () {
      setup.clearMenu();
      Engine.play(State.expired[State.expired.length - 1]);
    });
    $('#menu-4').css('visibility', 'visible');
    $('#menu-5').html('Test');
    $('#menu-5').on('click', function () {
      setup.clearMenu();
      setup.test();
    });
    $('#menu-5').css('visibility', 'visible');
  }
  else {
    console.log('setMainMenu');
    for (let i = 0; i < menuObjs.length; i++) {
      $('#menu-' + i).html(menuObjs[i].title);
      $('#menu-' + i).on('click', menuObjs[i].func);
      $('#menu-' + i).css('visibility', 'visible');
    }
  }
}

/*
 * 设置下级菜单按钮，可返回上级菜单
 */
setup.setSubMenu = function (menuObjs = 0, backto = State.expired[State.expired.length - 1]) {
  console.log(menuObjs);
  if (menuObjs == 0) {
    console.log('setSubMenu for Test')
    $('#sub-menu-container').append('<div class="pure-u-1-2"><div id="sub-menu-0" class="sub-menu-box"></div></div>');
    $('#sub-menu-0').html('Test');
    $('#sub-menu-0').on('click', function () {
      setup.clearMenu();
      setup.test();
    });
  }
  else {
    console.log('setSubMenu');
    for (let i = 0; i < menuObjs.length; i++) {
      $('#sub-menu-container').append('<div class="pure-u-1-2"><div id="sub-menu-' + i + '" class="sub-menu-box"></div></div>');
      $('#sub-menu-' + i).html(menuObjs[i].title);
      $('#sub-menu-' + i).on('click', menuObjs[i].func);
    }
  }
  $('#sub-menu-container').append('<div class="pure-u-1"><div id="sub-menu-back" class="sub-menu-box"></div></div>');
  $('#sub-menu-back').html('Back');
  $('#sub-menu-back').on('click', function () {
    setup.clearMenu();
    Engine.play(backto, true);
  });
  $('#sub-menu-container').css('visibility', 'visible');
}
