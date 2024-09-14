const SBP = {};
SBP.anonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzeHdlYm9qd3R4Z210dm9oZmR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2NDg2MzAsImV4cCI6MjAzMzIyNDYzMH0.1XhzomAchqFjRrjscXtXIV4KUmnStjxkOF0cV7NLRQY';
SBP.ref = 'gsxwebojwtxgmtvohfdv';
SBP.url = `https://${SBP.ref}.supabase.co`;
SBP.init = () => {
  return new Promise(async resolve => {
    console.log('Creating supabase client…');
    // await importScripts('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');
    // console.log('supabase:', supabase);

    try {
      const { createClient } = await import(
        'https://gcore.jsdelivr.net/npm/@supabase/supabase-js/+esm'
      );

      // const { createClient } = supabase;
      SBP.client = createClient(SBP.url, SBP.anonKey);
      console.log('SUCCEED. Instance:', SBP.client);
      resolve({ error: null });
    } catch (error) {
      console.log('FAILED. Error:', error);
      resolve({ error });
    }
  });
};

SBP.signIn = async (id, pass) => {
  return new Promise(async resolve => {
    console.log('Signing in……');
    const { data, error } = await SBP.client.auth.signInWithPassword({
      email: `${id}@sora`,
      password: pass
    });
    if (error) {
      resolve({ error });
    }
    console.log('SUCCEED. Response: ', data);
    SBP.user = data.user;
    SBP.session = data.session;
    console.log('User: ', SBP.user);
    console.log('Session: ', SBP.session);
    resolve({ error: null });
  });
};

SBP.signUp = (id, pass) => {
  return new Promise(async resolve => {
    console.log('Signing up……');
    const { data, error } = await SBP.client.auth.signUp({
      email: `${id}@sora`,
      password: pass
    });
    if (error) {
      console.log('FAILED. Error:', error);
      resolve({ error });
    }
    console.log('SUCCEED. Response:', data);
    SBP.user = data.user;
    SBP.session = data.session;
    console.log('User: ', SBP.user);
    console.log('Session: ', SBP.session);
    resolve({ error: null });
  });
  /*const accessToken = data.session.access_token;
  const refreshToken = data.session.refresh_token;
  const tokenExpiresAt = data.session.expires_at;
  const sbpAuthToken = JSON.parse(
    localStorage.getItem(`sb-${setup.sbpRef}-auth-token`)
  );
  console.log(`Access Token: ${sbpAuthToken.access_token}`);
  console.log(`refresh Token: ${sbpAuthToken.refresh_token}`);
  console.log(`user ID: ${sbpAuthToken.user.id}`);
  //   const access = { 'username': username, 'password': password };
  //   const response = await fetch(
  //     'https://gsxwebojwtxgmtvohfdv.supabase.co/functions/v1/login',
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': 'Bearer ' + setup.supabaseAnonKey, 'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(access)
  //     }
  //   );
  //   if (response.ok) {
  //     const data = JSON.parse(await response.text());
  //      console.log(data);
  //   } else {
  //     // 请求失败
  //     const data = JSON.parse(await response.text());
  //      console.log(data);
  //   }
  // const response = await fetch('https://gsxwebojwtxgmtvohfdv.supabase.co/rest/v1/login?username=eq.' + username, {
  //     headers: { 'apikey': setup.supabaseAnonKey },
  //   });
  //   if (response.ok) {
  //     data = JSON.parse(await response.text());
  //      console.log(data);
  //   } else {
  //     // 请求失败
  //   }
  /* } catch (error) {
    console.log(`Caught error: ${error.message}`);
    switch (error.message) {
      case 'User already registered':
        console.log('Handling error: User already registered');
        const { data, error } = await sbc.auth.signInWithPassword({
          email: `${id}@sora`,
          password: pass
        });
        console.log(data);
        break;

      default:
        console.log('Unhandled error');
    }
  }*/
};

SBP.insertCharacter = () => {
  return new Promise(async resolve => {
    console.log('Inserting Character……');
    const { data, error } = await SBP.client
      .from('character')
      .insert({
        name: State.getVar('$pcName'),
        gender: State.getVar('$pcGender'),
        hair_length: State.getVar('$pcHairLength'),
        hair_curl: State.getVar('$pcHairCurl'),
        hair_color: State.getVar('$pcHairColor')
      })
      .select('character_id')
      .eq('name', State.getVar('$pcName'));
    if (error) {
      resolve({ id: null, error });
    }
    console.log('SUCCEED. character_id: ', data[0].character_id);
    resolve({ id: data[0].character_id, error: null });
  });
};
