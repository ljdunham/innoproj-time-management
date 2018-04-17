const mongoose = require("mongoose");
//const Schema = mongoose.Schema;
const { Schema } = mongoose; //ES2016

const taskSchema = new Schema({
  googleId: String,
  title: String,
  description: String,
  start: Date,
  end: { type: Date, default: null },
  complete: { type: Boolean, default: false }
});

//Create new collection called tasks
mongoose.model("tasks", taskSchema);
