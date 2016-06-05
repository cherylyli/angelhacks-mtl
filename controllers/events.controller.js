var User = require('../models/User.model');
var bodyParser = require('body-parser');
var http = require('http');
var request = require('request');

module.exports = function(app) {
    
    //get a user's list of interests and send them back
    //req: username
    //res: get long & lat and feed to Eilon's function
    app.post('/getevent', function(req, res){
        app.use(bodyParser.urlencoded({extended:false}));
        app.use(bodyParser.json());
        var eventList = {};
        
            
    // http://terminal2.expedia.com/x/activities/search?location=London&startDate=2016-03-08&endDate=2016-03-18&apikey=OyqiPO5H2iY44KgRbvrgp5rnQdmLthxM
    var city = "Montreal";
    var dateBegin = "2016-06-05";
    var dateEnd = "2016-06-15";
    
    var expediaString = "http://terminal2.expedia.com/x/activities/search?location=" + city + "&startDate=" + dateBegin + "&endDate=" + dateEnd + "&apikey=OyqiPO5H2iY44KgRbvrgp5rnQdmLthxM";
    
    request('http://www.google.com', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // Print the google web page.
        }
    });

        User.find({username: req.body.username}, function(err, prof){
            if (err) throw err;
            var lat = prof.locationLat;
            var long = prof.locationLong;
            
            
            
            
        });
        
       
        
    });
 
 
    
}

