var express = require('express');
var app = express();
var User = require('./models/User.model');
var Pack = require('./models/Pack.model');
var bodyParser = require('body-parser');
var config = require('./config/index');
var mongoose = require('mongoose');
var howlController = require('./controllers/howl.controller.js');
var loginController = require('./controllers/login.controller.js');


mongoose.connect(config.getDBConnectionString());

app.get('/', function(req, res){
   res.send("testing");
});

howlController(app);
loginController(app);

process.env.PORT = process.env.PORT || 80;

app.listen(process.env.PORT, function(){
    console.log("running on " + process.env.PORT);
});