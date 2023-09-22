const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: { type: String },
  password: { type: String },
});

// Export model
module.exports = mongoose.model("User", UserSchema);
