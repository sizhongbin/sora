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
    $(document).off(':typingstop');
    console.log(goto);
    $('#menu-5').html('继续');
    $('#menu-5').on('click', function () {
      setup.clearMenu();
      Engine.play(goto); 
    });
    $('#menu-5').css('visibility', 'visible');
}

/*
 * 设置一级菜单按钮，不可返回
 */
setup.setMainMenu = function (menuObjs = 0) {
    $(document).off(':typingstop');
    console.log(menuObjs);
    if (menuObjs == 0) {
        console.log('setMainMenu for Test')
        $('#menu-4').html('Back');
        $('#menu-4').on('click', function(){
          setup.clearMenu();
          Engine.play(State.expired[State.expired.length - 1]);
        });
        $('#menu-4').css('visibility', 'visible');
        $('#menu-5').html('Test');
        $('#menu-5').on('click', function(){
          setup.clearMenu();
          setup.test();
        });
        $('#menu-5').css('visibility', 'visible');
    }
    else {
        console.log('setMainMenu');
        for (let i = 0; i < menuObjs.length; i++) {
            $('#menu-' + i).html(menuObjs[i].title);
            $('#menu-' + i).on('click', function () { 
              setup.clearMenu();
              Engine.play(menuObjs[i].goto); });
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
        $('#sub-menu-0').on('click', function() {
          setup.clearMenu();
          setup.test();
        });
    }
    else {
        console.log('setSubMenu');
        for (let i = 0; i < menuObjs.length; i++) {
            $('#sub-menu-container').append('<div class="pure-u-1-2"><div id="sub-menu-' + i + '" class="sub-menu-box"></div></div>');
            $('#sub-menu-' + i).html(menuObjs[i].title);
            $('#sub-menu-' + i).on('click', function () { 
              setup.clearMenu();
              Engine.play(menuObjs[i].goto); });
        }
    }
    $('#sub-menu-container').append('<div class="pure-u-1"><div id="sub-menu-back" class="sub-menu-box"></div></div>');
    $('#sub-menu-back').html('Back');
    $('#sub-menu-back').on('click', function () { 
      setup.clearMenu();
      Engine.play(backto); });
    $('#sub-menu-container').css('visibility', 'visible');
}

/*
 * 测试-打印存档
 */
setup.test = function () {
    // console.log(State.getVar("$location")); // 获取变量
    //State.setVar("$location", "普隆德拉"); // 改变量。如果涉及展示，需要至少切一次passage。
    let save = Save.autosave.get();
    console.log(save);
}

setup.test3 = async function () {
    let urlParam = $(location).attr('href').split('?')[1];
    if (!urlParam) {
        let url = 'https://github.com/login/oauth/authorize?client_id=Iv1.5a17afa660d27877';
        if ($(location).attr('href') == 'http://127.0.0.1:1234/') url += '&redirect_uri=http://127.0.0.1:1234/';
        $(location).prop('href', url);
    }
    else {
        console.log(urlParam);
        urlParam = urlParam.split('=');
        console.log(urlParam);
        if (urlParam.length == 2 && urlParam[0] == 'code') {
            console.log(urlParam[1]);
            const queryParam = new URLSearchParams();
            queryParam.append('client_id', 'Iv1.5a17afa660d27877');
            queryParam.append('client_secret', '567747df974b8dbeb8fbcbed80c4458513bed8de');
            queryParam.append('code', urlParam[1]);
            let postTime = new Date().getTime();
            console.log(`postTime: ${postTime}`);
            const response = await fetch('https://production.gitoaths.sizhongbin-b31.workers.dev/corsproxy/?apiurl=https://github.com/login/oauth/access_token', {
                method: 'POST',
                body: queryParam,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                const responseObj = await response.json();
                console.log(`access_token: ${responseObj.access_token}`);
                console.log(`expires_in: ${responseObj.expires_in}`);
                console.log(`expires_time: ${postTime + responseObj.expires_in * 1000}`);
                console.log(`refresh_token: ${responseObj.refresh_token}`);
                console.log(`refresh_token_expires_in: ${responseObj.refresh_token_expires_in}`);
                console.log(`refresh_token_expires_time: ${postTime + responseObj.refresh_token_expires_in * 1000}`);
                await setup.loadComments(responseObj.access_token);
            } else {
                throw new Error('请求失败');
            }
        }
        else console.log('error');
    }
}
