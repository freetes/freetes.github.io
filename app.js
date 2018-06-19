const express = require('express');
const fs = require('fs');
const app = express();

app.use('/public', express.static('public'));
app.use('/config', express.static('config'));

app.get('/', (req, res) => {
  fs.readFile('./index.html', 'utf-8', data=>{
    return res.end(data)
  })
});

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});