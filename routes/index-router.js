let
  indexRouter = {},
  passport    = require("passport"),
  User        = require("../models/user-model");


// ======================================== GET ========================================
// RENDERS pages ../views/index/
indexRouter.indexPage   = (req, res)=>{res.render("index/index")};
indexRouter.signupPage  = (req, res)=>{res.render("index/signup")};
indexRouter.loginPage   = (req, res)=>{res.render("index/login")};
// LOGOUT
indexRouter.logout      = (req, res)=>{
  req.logout();
  req.flash("error", "Now you logout");
  res.redirect("/")
};


// ======================================== POST ========================================
// CREATE NEW user
indexRouter.signup = (req, res)=>{
  if (req.body.password === req.body.passwordrepeat) {
    let newUser = new User({
      username: req.body.username,
      age: req.body.age,
      email: req.body.email});
    User.register(newUser, req.body.password, (err, user)=>{
      if (err) {
        req.flash("error", err.message);
        return res.redirect("/signup")
      }
      passport.authenticate("local")(req, res, ()=>{
        req.flash("done", "Welcome");
        res.redirect("/post")
      })
    })
  } else {
    req.flash("error", "Passwords do not match");
    res.redirect('/signup')
  }
};
// LOGIN
// indexRouter.login = passport.authenticate("local", {
//   successRedirect: "/post",
//   failureRedirect: "/login"
// });
indexRouter.login = (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {req.flash("error", err.message);return next(err)}
    if (!user) {req.flash("error", "Try again");return res.redirect('/login')}
    req.logIn(user, function (err) {
      if (err) {req.flash("error", err.message); return next(err);}
      req.flash("done", `welcome, Mr. ${user.username}`);
      return res.redirect("/post");
    });
  })(req, res, next);
};


module.exports = indexRouter;