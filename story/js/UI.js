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
setup.test = function () {
    let param = $(location).attr('href').split('?')[1];
    if (!param) {
        let url = 'https://github.com/login/oauth/authorize?client_id=Iv1.5a17afa660d27877';
        if ($(location).attr('href') == 'http://127.0.0.1:1234/') url += '&redirect_uri=http://127.0.0.1:1234/';
        $(location).prop('href', url);
    }
    else {
        console.log(param);
        param = param.split('=');
        console.log(param);
        if (param.length == 2 && param[0] == 'code') {
            console.log(param[1]);
            fetch('https://github.com/login/oauth/access_token', {
                method: 'POST',
                body: data,
                headers: {
                    'client_id': 'Iv1.5a17afa660d27877',
                    'client_secret': '567747df974b8dbeb8fbcbed80c4458513bed8de',
                    'code': param[2],
                    // 'Access-Control-Allow-Origin': '*',
                    // 'Access-Control-Allow-Headers': 'Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since, X-GitHub-OTP, X-Requested-With',
                    // 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE',
                    // 'Access-Control-Expose-Headers': 'ETag, Link, X-GitHub-OTP, x-ratelimit-limit, x-ratelimit-remaining, x-ratelimit-reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval',
                    // 'Access-Control-Max-Age': '86400'
                }
            })
                .then(function (response) {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('请求失败');
                    }
                })
                .then(function (data) {
                    // 处理响应结果
                })
                .catch(function (error) {
                    // 处理请求失败情况
                });
        }
        else console.log('error');
    }
}
