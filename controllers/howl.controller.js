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
    
    //find all the nearby packs
    app.post('/sendHowl', function(req, res){
    	//find the location of the user sending the request
    	User.find({username: req.body.username}, function(err, profile){
    		if (err) throw err;
    		console.log(profile);
    	});
        var packQuery = Pack;
        
    });
    
    
};
