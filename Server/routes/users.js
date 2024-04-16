const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/kuchbhi");

const todoSchema = new mongoose.Schema({
  task : String,
  done : {
    type:Boolean,
    default: false
  }
});

module.exports = mongoose.model("todos", todoSchema);

