var User = require('../models/User.model');
var bodyParser = require('body-parser');
var http = require('http');

module.exports = function(app) {
    
    //get a user's list of interests and send them back
    //req: username
    //res: get long & lat and feed to Eilon's function
    app.post('/getevent', function(req, res){
        app.use(bodyParser.urlencoded({extended:false}));
        app.use(bodyParser.json());
        var eventList = {};

        User.find({username: req.body.username}, function(err, prof){
            if (err) throw err;
            var lat = prof.locationLat;
            var long = prof.locationLong;
            
            
            
            
        });
        
       
        
    });
 
 
    
}

