var configValues = require('./config.json');

module.exports = {
    getDBConnectionString: function(){
        return "mongodb://" + configValues.dbusername + ":" + configValues.dbpassword + "@ds045684.mlab.com:45684/angelhacksmtl";
    }
};
