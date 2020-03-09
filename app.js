const express = require('express')
const axios = require('axios')
const app = express()


app.get('/', async function (req, res) {
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
  
  const game = await axios.get(
    'https://api.twitch.tv/helix/streams?game_id=33214',
    {
      headers: {
        Authorization: `Bearer ${ token }`
      }
    }
  ).catch(error => {
    console.log(error);
  })
  console.log(game);
  res.send('Hello World!')
})

let server = app.listen(process.env.PORT || 4000, function(){
  let port = server.address().port;
  console.log("Server started at http://localhost:%s", port);
});
