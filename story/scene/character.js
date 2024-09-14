setup.appearance = {
  hairLength: {
    0: '短',
    1: '中',
    2: '长'
  },
  hairCurl: {
    0: '直',
    1: '波浪',
    2: '卷'
  },
  gender: {
    0: '男',
    1: '女'
  }
};

setup.fetchCharacter = async () => {
  UTIL.connect();
  const { data, error } = await SBP.client
    .from('character')
    .select('character_id')
    .eq('user_id', SBP.user.id);
  if (error) {
    console.log(error);
    UI.alert(error);
  }
  UTIL.disconnect();
};

setup.createCharacter = async () => {
  UTIL.connect();
  const notice = $('#character-create-status').text();
  const { id, error } = await SBP.insertCharacter();
  $('input').prop('disabled', false);
  $('button').prop('disabled', false);
  if (error) {
    console.log('ERROR: ', error);
    switch (error.code) {
      case '23505':
        $('#character-create-status').text(notice + '失败！角色名已被占用。');
        break;
      default:
        $('#character-create-status').text(notice + '失败！未知错误。');
    }
  } else {
    State.setVar('$pcId', id);
    Engine.play('CharacterSave');
  }
  UTIL.scrollToBottom();
  UTIL.disconnect();
};
