/*
 * 设置Loading效果
 */
setup.setLoading = function (toggle = true) {
    if (toggle) $('html').attr('data-init', 'loading');
    else $('html').removeAttr('data-init');
}

/*
 * 设置按钮
 */
setup.setMenu = function (id = 0, scene = 'test') {
    console.log('setup.setMenu(' + id + ',' + scene + ')');
    $('.menu-box').off('click');
    $('.menu-box').html('');
    if (id == 0) {
        $('#menu-5').html('Back');
        $('#menu-5').on('click', Engine.backward);
        $('#menu-6').html('Test');
        $('#menu-6').on('click', this.test);
    }
    else {
        switch (scene) {
            case '1': {
                $('#menu-' + id).html('1');
                console.log(1)
                break;
            }
        }
    }
}

/*
 * 测试专用按钮函数
 */
setup.test = async function () {
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
            } else {
                throw new Error('请求失败');
            }
        }
        else console.log('error');
    }
}
