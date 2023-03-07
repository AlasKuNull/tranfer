const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

app.use(bodyParser.json());

app.post('/chat/completions', (req, res) => {
  const data = req.body;
  
  const options = {
    url: 'https://api.openai.com/v1/chat/completions',
    method: 'POST',
    headers: {
      'Authorization':req.headers.authorization,
      'Content-Type': 'application/json'
    },
    json: data
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error(error);
      return res.status(500).send(error);
    }

    res.send(body);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
