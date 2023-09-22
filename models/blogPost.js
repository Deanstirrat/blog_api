const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: { type: String, required: "title required" },
  text: { type: String, required: "text required" },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  dateTime: { type: Date }
});

// Export model
module.exports = mongoose.model("BlogPost", BlogPostSchema);
