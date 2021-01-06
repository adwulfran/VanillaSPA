var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var dist = path.join(__dirname, 'dist/');
var style = path.join(__dirname, 'app/');
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/dist', express.static(dist));
app.use('/style', express.static(style));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './app/index.html'));
});

app.listen(8082, () => {
  console.log(`======= Webapp Visualizer STARTED =======`)
})