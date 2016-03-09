var express = require('express');
var app = express();
var router = express.Router();

app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/view'));
app.use(express.static(__dirname + '/node_modules'));

router.get('/', function (req, res, next) {
  res.send('/index.html');
});

module.exports = app;

app.listen(process.env.PORT, function () {
  console.log("\nListening on a very special port");
});
