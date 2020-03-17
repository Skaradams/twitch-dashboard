const express = require('express')
const axios = require('axios')
const app = express()


app.use(async (req, res, next) => {
  const response = await axios.post(
    'https://id.twitch.tv/oauth2/token?',
    {},
    {
      params: {
        client_id: '47t4devxqry4861taxoikjrl7mvpl2',
        client_secret: 'v9pq35ee8oqw4os4hxwyf0ivqe3b55',
        grant_type: 'client_credentials'
      }
    }
  ).catch(error => {
    console.log(error);
  })
  const token = response.data.access_token
  next();
})

app.get('/', async function(req, res) {
  console.log("home");
  const response = await axios.post(
    'https://id.twitch.tv/oauth2/token?',
    {},
    {
      params: {
        client_id: '47t4devxqry4861taxoikjrl7mvpl2',
        client_secret: 'v9pq35ee8oqw4os4hxwyf0ivqe3b55',
        grant_type: 'client_credentials'
      }
    }
  ).catch(error => {
    console.log(error);
  })
  const token = response.data.access_token

  const users = await axios.get(
    'https://api.twitch.tv/helix/users',
    {
      headers: {
        Authorization: `Bearer ${ token }`,
      },
      params: {
        login: 'skaradams'
      }
    }
  ).catch(error => {
    console.log(error);
  })
  const broadcaster_id = users.data.data[0].id;

  const clips = await axios.get(
    'https://api.twitch.tv/helix/clips',
    {
      headers: {
        Authorization: `Bearer ${ token }`,
      },
      params: {
        broadcaster_id
      }
    }
  ).catch(error => {
    console.log(error);
  })

  console.log(clips.data.data[0]);
  res.send('Hello World!')
})

let server = app.listen(process.env.PORT || 4000, function(){
  let port = server.address().port;
  console.log("Server started at http://localhost:%s", port);
});
