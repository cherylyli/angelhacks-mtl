//angelhack-mtl-cherylyli.c9users.io/initPack
var User = require('../models/User.model');
var Pack = require('../models/Pack.model');
var bodyParser = require('body-parser');


module.exports = function(app) {
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());

    app.post('/initPack', function(req, res){
    	var longitude;
    	var latitude;
    	console.log(req.body.username + req.body.packName);
    	User.find({username: req.body.username}, function(err, profile){
    		if (err) throw err;
    		longitude = profile[0].locationLong;
    		latitude = profile[0].locationLat;
    		console.log(profile);
    	})

        var newPack = Pack ({
        	packName: req.body.packName,
        	packDescription: req.body.packName,
        	packUsers: [req.body.username],
        	locationLat: latitude,
        	locationLong: longitude
        });

        newPack.save(function(err){
        	if (err) throw err;
        	res.end("success");
        });
    })
    
    //find all the nearby packs, send username
    app.post('/join', function(req, res){
    	//find the location of the user sending the request
    	User.findOne({username: req.body.username}, function(err, profile){
    		if (err) throw err;
    		profile.packName = req.body.packName;
    		profile.save(function(err){
    		    if (err) throw err;
    		});
    		console.log(profile);
    	});
        Pack.findOne({packName: req.body.packName}, function(err, pack){
            if (err) throw err;
            pack.packUsers.push(req.body.username);
            pack.save(function(err){
                if (err) throw err;
                res.send("success");
            })
            console.log("Cheryl sent this request: " + pack + "end of cheryl stuff");
        });
        
        
        
    });
    app.post('/sendHowl', function(req,res){    	//find the location of the user sending the request
    	User.find({username: req.body.username}, function(err, profile){
    		if (err) throw err;
    		console.log(profile);
    		var closePacks = [];
	        var packStream = Pack.find().stream();
	        var finished=false;
	        packStream.on('data', function (doc) {
	        	var lat1;//=doc.locationLat;
	        	var long1;//=doc.locationLong;
	        	User.findOne({username: doc.packUsers[0]}, function (err,profile){
	        		if (err) throw err;
	        		console.log("Pack Leader: " + profile);
	        		lat1=profile.locationLat;
	        		long1=profile.locationLong;
	        		var lat2=profile.locationLat;
		        	var long2=profile.locationLong;
		        	console.log(lat1);
		        	console.log(long1);
		        	var dist=getDistanceFromLatLonInKm(lat1,long1,lat2,long2);
		        	if (dist<2.00){
		        		closePacks.push(doc);
		        		console.log("ADDED with distance "+ dist);
		        		console.log(doc);
		        	}
		        	if (finished){
			        	console.log(closePacks);
			        	res.send(closePacks);
			        	console.log("Eilon sent this request, umad?")
			        	res.end("success");
		        	}
	        	});

	        	
	        }).on('error', function (err) {
	        	console.log("Error in stream");
	        	throw err;
	        }).on('close', function(){
	        	finished=true;
	        	//console.log(closePacks);
		        //res.send(closePacks);
		        //console.log("Eilon sent this request, umad?")
		        //res.end("success");
	        });
	        
    	});
	});

    
    
};

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
