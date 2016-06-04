var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var packSchema = new Schema({
   packName: String,
   packDescription: String,
   packUsers: [String],
   locationLat: Number,
   locationLong: Number
});
var Pack = mongoose.model("Pack", packSchema);

module.exports = Pack;