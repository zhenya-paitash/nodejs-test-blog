let mongoose = require("mongoose");


let commentSchema = new mongoose.Schema({
  text: String,
  time: {type: Date, default: Date.now},

  author: {
    id:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
    username: String
  },
  postId: {type: mongoose.Schema.Types.ObjectId, ref: "Post"}
});


module.exports = mongoose.model("Comment", commentSchema);