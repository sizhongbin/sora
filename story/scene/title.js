setup.init = async function () {
  UTIL.connect();
  const { error } = await SBP.init();
  if (error) {
    $('#title-login-status').text('失败！');
    $('#passage-title').wiki('<p>请刷新浏览器重试。</p>');
    UTIL.scrollToBottom();
    UTIL.disconnect();
  } else {
    $('#title-login-status').text('成功！');
    if (Save.browser.slot.has(0)) {
      $('#passage-title').wiki('<<title-login-history>>');
    }
    $('#passage-title').wiki('<<title-login-new>>');
    UTIL.disconnect();
    //UTIL.scrollToBottom();
  }
};

setup.signUp = async function (id, pass) {
  UTIL.connect();
  const notice = $('#title-login-new-notice ').text();
  const { error } = await SBP.signUp(id, pass);
  if (error) {
    console.log(error.message);
    if (error.message == 'User already registered') {
      setup.signIn(id, pass);
      UTIL.disconnect();
    } else {
      $('input').prop('disabled', false);
      $('button').prop('disabled', false);
      switch (error.message) {
        case 'Password should be at least 6 characters.':
          $('#title-login-new-notice ').text(notice + '失败！密码最少为6位。');
          break;
        case 'Unable to validate email address: invalid format':
          $('#title-login-new-notice ').text(notice + '失败！账号格式错误。');
          break;
        case 'Signup requires a valid password':
          $('#title-login-new-notice ').text(notice + '失败！密码为空。');
          break;
        default:
          console.log('Unhandled error: ', Object.entries(error));
          $('#title-login-new-notice ').text(notice + '失败！未知错误。');
      }
      UTIL.disconnect();
      UTIL.scrollToBottom();
    }
  } else {
    $('#title-login-new-notice ').text(notice + '成功！将注册此账号并登陆。');
    $('#passage-title').wiki(
      '<p><<link "继续" "Character">><<run $("input").prop("disabled", false);$("button").prop("disabled", false)>><</link>></p>'
    );
    UTIL.disconnect();
    UTIL.scrollToBottom();
  }
};

setup.signIn = async function (id, pass) {
  UTIL.connect();
  const notice = $('#title-login-new-notice ').text();
  const { error } = await SBP.signIn(id, pass);
  if (error) {
    console.log(error.message);
    $('input').prop('disabled', false);
    $('button').prop('disabled', false);
    switch (error.message) {
      case 'Invalid login credentials':
        $('#title-login-new-notice ').text(notice + '失败！密码错误。');
        break;
      default:
        console.log('Unhandled error: ', Object.entries(error));
        $('#title-login-new-notice ').text(notice + '失败！未知错误。');
    }
  } else {
    $('#title-login-new-notice ').text(notice + '成功！将以此账号登陆。');
    $('#passage-title').wiki(
      '<p><<link "继续" "Character">><<run $("input").prop("disabled", false);$("button").prop("disabled", false)>><</link>></p>'
    );
  }
  UTIL.disconnect();
  UTIL.scrollToBottom();
};

setup.signInWithAutosave = async function () {
  UTIL.connect();
  const notice = $('#title-login-history-notice ').text();
  const autosave = Save.browser.slot.get(0).metadata;
  const { error } = await SBP.signIn(autosave.account, autosave.password);
  if (error) {
    console.log(error.message);
    $('input').prop('disabled', false);
    $('button').prop('disabled', false);
    switch (error.message) {
      case 'Invalid login credentials':
        $('#title-login-history-notice ').text(notice + '失败！密码错误。');
        break;
      default:
        console.log('Unhandled error: ', Object.entries(error));
        $('#title-login-history-notice ').text(notice + '失败！未知错误。');
    }
    UTIL.disconnect();
  } else {
    State.setVar('$account', autosave.account);
    State.setVar('$password', autosave.password);
    $('#title-login-history-notice').text(notice + '成功！');
    $('#title-login-history-notice').wiki(
      '<<link "继续" "Character">><<run $("input").prop("disabled", false);$("button").prop("disabled", false)>><</link>>'
    );
    UTIL.disconnect();
  }
};
