var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var	controller = require('./controller/controller');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

controller(app);


// Server
app.listen(3000, function(){
	console.log("[INFO] Server started at localhost:3000");
});


var mongoose = require('mongoose')
    , Admin = mongoose.mongo.Admin;

/// create a connection to the DB
var connection = mongoose.createConnection(
    'mongodb://nvh_user:123456@ds131511.mlab.com:31511/nvh_test');
connection.on('open', function() {
    // connection established
    new Admin(connection.db).listDatabases(function(err, result) {
        console.log('listDatabases succeeded');
        // database list stored in result.databases
        var allDatabases = result.databases;
    });
});
