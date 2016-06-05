var User = require('../models/User.model');
var bodyParser = require('body-parser');


module.exports = function(app) {
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());
    
    
    app.post('/signup', function(req, res){
        //save info from form to database
        try {
            User.find({username: req.body.username}, function(err, existingProf){
                if (err) {
                    throw err;
                } else if (existingProf.length === 0) { //if username doesn't exist, create new profile
                    console.log(req.body.username + ' ' + req.body.locationLong +' '+ req.body.locationLat);
            
                    var newUser = User ({
                        username: req.body.username,
                        locationLong: req.body.locationLong,
                        locationLat: req.body.locationLat,
                        packName: req.body.packName,
                        interest: req.body.interest
                    });
            
                    newUser.save(function(err){
                        if (err) throw err;
                        res.end("success");
                    });
                }
            });
        } catch (err) {
            console.log("Error with findOne method in MongoDB");
            res.end("error");
        }
    });


    
    app.post('/login', function(req, res){
        //confirm with database username exists
        User.find({username: req.body.username}, function(err, existingProf){
            if (err) throw err;
            if (existingProf.length === 0) {
                res.end("no user");
            } else {
                res.send(req.body.username);
            }
        });
    });
    
    app.post('/location', function(req, res){
        var query = {username: req.body.username};
        console.log(req.body.username + ' ' + req.body.long);
        
        User.findOneAndUpdate(query, {$set:{locationLong: req.body.long, locationLat: req.body.lat}}, {new: true}, function(err, data){
            if (err) throw err;
            res.end("success");
            
        });
        
    });
    

    
};
