var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
   username: String,
   locationLong: Number,
   locationLat: Number,
   packName: String,
   interest: [String]
});
var User = mongoose.model("User", userSchema);

module.exports = User;