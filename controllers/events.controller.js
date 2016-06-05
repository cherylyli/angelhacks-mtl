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
        var city;

        
            
 
        var dateBegin = "2016-06-05";
        var dateEnd = "2016-06-15";
    
        var expediaString = "";
        var expediaStuff = "";

        User.findOne({username: req.body.username}, function(err, prof){
            if (err) throw err;
            var lat = prof.locationLat;
            var long = prof.locationLong;
            var userInterests = prof.interest[0];
            console.log(prof);
            console.log(lat);
            console.log(userInterests);
            
            //var googleString = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + 
        
            var googleString="https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452";
                request(googleString, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var jbody=JSON.parse(body);
                        city=jbody["results"][0]["address_components"][3]["long_name"];
                        console.log(city);
                    }
                });
            
            
            //get location from Eilon
            expediaString = "http://terminal2.expedia.com/x/activities/search?location=" + city + "&startDate=" + dateBegin + "&endDate=" + dateEnd + "&apikey=OyqiPO5H2iY44KgRbvrgp5rnQdmLthxM";
            
            request(expediaString, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var jsonBody = JSON.parse(body);
                    expediaStuff = jsonBody.activities;
                    var searchActivityList = [];
                    expediaStuff.forEach(function(item){
                        
                        
                    });
                    //console.log(expediaStuff);
                    res.send(body); // Print the google web page.
                }
            });
            
        });
    
    });
 
   
} //end module.exports


//activityList is a list of all the acitivities from expedia API
//userInterests is a list of all the interests of the user
function filterExpedia(activityList, userInterests) {
    
}

