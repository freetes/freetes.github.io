const express = require('express');
const fs = require('fs');
const app = express();

let html = ''

app.use('/public', express.static('public'));
app.use('/config', express.static('config'));

app.get('/', (req, res) => {
  if(html != ''){
    return res.end(html)
  }
  else{
    fs.readFile('./index.html', 'utf-8', (err, data)=>{
      html = data
      return res.end(html)
    })
  }
});

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});