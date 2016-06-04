var User = require('../models/user.model');
var bodyParser = require('body-parser');


module.exports = function(app) {
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());
    
    
    app.post('/sendHowl', function(req, res, next){
        
        
    });
    
    
};
