/*
 * 测试-打印存档
 */
setup.testPrintSave = function () {
  // console.log(State.getVar("$location")); // 获取变量
  //State.setVar("$location", "普隆德拉"); // 改变量。如果涉及展示，需要至少切一次passage。
  let save = Save.autosave.get();
  console.log(save);
}

/*
 * 测试-网页流github授权
 */
setup.testGit = async function () {
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

/*
 * 测试-连Deno
 */
setup.testDeno = async function () {
    console.debug("> testDeno");
    let access = {"testid1": "testpass"};
    console.debug("Access:",access);
    const response = await fetch('https://soraserve.deno.dev/signin', {
        method: 'POST',
        body: JSON.stringify(access),
      });
}

/*
 * 测试代码只跑一次
 */
// $(document).one(':storyready', setup.testDeno);