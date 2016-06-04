var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var packSchema = new Schema({
   packName: String,
   packDescription: String,
   packUsers: [String]
});
var Pack = mongoose.model("Pack", packSchema);

module.exports = Pack;