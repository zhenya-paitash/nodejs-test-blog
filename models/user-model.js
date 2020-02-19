let
  mongoose      = require("mongoose"),
  passLocMongo  = require("passport-local-mongoose");


let userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  age: Number,
  dateRegister: {type: Date, default: Date.now}
});

// userSchema.plugin(passLocMongo);
userSchema.plugin(passLocMongo, {usernameField : 'email' });



module.exports = mongoose.model("User", userSchema);