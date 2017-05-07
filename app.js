var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var	controller = require('./controller/controller1');
controller(app);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Server
app.listen(3000, function(){
	console.log("[INFO] Server started at localhost:3000");
});
