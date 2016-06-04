var User = require('../models/User.model');
var Pack = require('../models/pack.model');
var bodyParser = require('body-parser');


module.exports = function(app) {
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());

    app.post('/initPack', function(req, res){
        var newPack = Pack ({
        	packName: req.body.packName,
        	packDescription: req.body.packName,
        	packUsers: [],
        	packLeader: 
        });


    })
    
    
    app.post('/sendHowl', function(req, res){
    	//find the location of the user sending the request
    	User.find({username: req.body.username}, function(err, profile){
    		if (err) throw err;
    		console.log(profile);
    	});
        
        
    });
    
    
};
