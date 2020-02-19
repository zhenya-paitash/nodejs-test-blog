let
  mongoose = require("mongoose");


let postSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  datetime: {type: Date, default: Date.now},

  author: {
    id:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: String
  },
  comments: [ { type: mongoose.Schema.Types.ObjectId, ref: "Comment" } ]
});


module.exports = mongoose.model("Post", postSchema);