const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  name: { type: String, require: "name is required"},
  text: { type: String, required: "text required" },
  dateTime: { type: Date }
});

// Export model
module.exports = mongoose.model("Comment", CommentSchema);
