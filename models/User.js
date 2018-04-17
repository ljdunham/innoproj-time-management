const mongoose = require("mongoose");
//const Schema = mongoose.Schema;
const { Schema } = mongoose; //ES2016

const userSchema = new Schema({
  googleId: String,
  refreshToken: String,
  accessToken: String,
  accessTokenExpiresIn: Date
});

//Create new collection called users
mongoose.model("users", userSchema);
