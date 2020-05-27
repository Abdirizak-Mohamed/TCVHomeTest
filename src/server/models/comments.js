var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentsSchema = new Schema({
  name: String,
  comment: String,
  dateTime: String
});

module.exports = mongoose.model("comments", commentsSchema);
