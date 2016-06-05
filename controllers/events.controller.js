var User = require('../models/User.model');
var bodyParser = require('body-parser');
var request = require('request');
var matching = require('../config/events.json');

module.exports = function(app) {
    
    //get a user's list of interests and send them back
    //req: username
    //res: get long & lat and feed to Eilon's function
    app.post('/getevents', function(req, res){
        app.use(bodyParser.urlencoded({extended:false}));
        app.use(bodyParser.json());
        var city;
        var dateBegin = "2016-06-03";
        var dateEnd = "2016-06-25";
    
        var expediaString = "";
        var expediaStuff = "";

        //find a user and extract his/her location & interests
        //go to google to find city from location
        
        User.findOne({username: req.body.username}, function(err, prof){
            if (err) throw err;
            
            //get longitutide/latitude & get city name; get suggested events from expedia
            //go to google to find city from location
            //var googleString="https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452";
            var lat = prof.locationLat;
            var long = prof.locationLong;
            var googleString = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + long + ',' + lat;
            request(googleString, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var jbody = JSON.parse(body);
                    //city=jbody["results"][0]["address_components"][4]["long_name"];
                        //console.log(city);
                }
            });
        
            //get location from Eilon
            expediaString = "http://terminal2.expedia.com/x/activities/search?location=" + "Montreal" + "&startDate=" + dateBegin + "&endDate=" + dateEnd + "&apikey=OyqiPO5H2iY44KgRbvrgp5rnQdmLthxM";
            
            //userInterests: an array of the interests of the user
            var userInterests = prof.interest[0].substr(1, prof.interest[0].length-2).split(', ');
            
            var eventList = [];
            request(expediaString, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var jsonBody = JSON.parse(body);
                    expediaStuff = jsonBody.activities;
                    //each item: access title & categories & push!
                    expediaStuff.forEach(function(item){
                        var temp = {
                            title: item.title,
                            categories: item.categories,
                            latlng: item.latLng,
                            imageUrl: item.imageUrl
                        };
                        eventList.push(temp);
                    });
                    //res.send(eventList);
                    
                    var matchedEvents=[];
                    //console.log(userInterests);
                    //console.log(matching);
                    
                    //for each item in eventList, use the categories to index into "matching" 
                    //if user has an interest mapped to that index, then push into matchedEvents
                    //then remove repeats
                    eventList.forEach(function(separateEvent){
                       separateEvent.categories.forEach(function(cat){
                            var list = matching[cat];
                            //console.log(cat + ": " + list + " type " + typeof list);
                            if (list !== null && list !== undefined){

                                list.forEach(function(trait){
                                    userInterests.forEach(function(individualTrait){
                                        if(trait === individualTrait){
                                            //console.log(separateEvent);
                                            var temp = {
                                                title: separateEvent.title,
                                                categories: separateEvent.categories,
                                                latlng: separateEvent.latlng,
                                                imageUrl: separateEvent.imageUrl.substr(2, separateEvent.imageUrl.length-1)
                                            }
                                            matchedEvents.push(temp);
                                        }
                                    });
                                });
                            }
                           
                       });
                    });
                    
                    for (var i=0; i<matchedEvents.length -1; i++){
                        if (matchedEvents[i].title === matchedEvents[i+1].title){
                            matchedEvents.splice(i, 1);
                        }
                    }

                    res.send(matchedEvents);
                    
                }
            });
            
        });
    
    });
 

    //get landmarks?
   
} //end module.exports
