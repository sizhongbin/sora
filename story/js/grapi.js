/*
 *  Github REST API相关功能
 *  在故事中通过<<run setup.XX()>>运行
 */

/*
 * 初始化octokit
 */
setup.initOctokit = async function () {
  setup.setLoading();  
  let { Octokit } = await import('https://esm.sh/octokit');
  setup.setLoading(false); 
    console.log('run initOctokit()');
    return new Octokit({ });
}

/*
 * 读取comments
 */
setup.loadComments = async function () {
  const octokit = await this.initOctokit();
  let comments = await octokit.request('GET /repos/sizhongbin/sora/issues/1/comments', {
    owner: 'sizhongbin',
    repo: 'sora',
    issue_number: '1',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });
  console.log(comments);
  let data = comments.data;
  for (let i = 0; i < data.length; i++) {
    console.log(i + ': ' + data[i].author_association + ' / ' + data[i].id + ': Lv' + JSON.parse(data[i].body).LV + ' ' + JSON.parse(data[i].body).Name);
  }
}
  
    // 增加comment
    /*
    await octokit.request('POST /repos/sizhongbin/sora/issues/1/comments', {
      owner: 'sizhongbin',
      repo: 'sora',
      issue_number: '1',
      body: '{"Name":"ccc","LV":"3"}',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
  
    */
    // 更新comment
    /*
    await octokit.request('PATCH /repos/sizhongbin/sora/issues/comments/1970391169', {
      owner: 'sizhongbin',
      repo: 'sora',
      issue_number: '1',
      body: '{"Name":"ddd","LV":"4"}',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    */
