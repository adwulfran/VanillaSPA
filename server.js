var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var dist = path.join(__dirname, 'dist/');
var src = path.join(__dirname, 'app/pages/');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/dist', express.static(dist));
app.use('/style', express.static(src));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './app/app-component.html'));
});

app.listen(8082, () => {
  console.log(`======= Webapp Visualizer STARTED =======`)
})