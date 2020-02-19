// IMPORTS
let
  express           = require("express"),
  expressSession    = require("express-session"),
  mongoose          = require("mongoose"),
  passport          = require("passport"),
  LocalPassport     = require("passport-local"),
  bodyParser        = require("body-parser"),
  flash             = require("connect-flash"),
  methodOverride    = require("method-override"),
  exSynitize        = require("express-sanitizer"),
  User              = require("./models/user-model"),
  // dotenv            = require("dotenv").config(),
  config            = require("./config"),
  router            = require("./routes/router"),
  app               = express();



// SETUP APP
mongoose.connect(config.URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended: true}));
app.use(exSynitize());
app.use(flash());
app.use(methodOverride("_method"));
app.use(expressSession({
  secret: process.env.SECRET || "SECRET",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalPassport(User.authenticate()));
// passport.use(new LocalPassport({usernameField: 'email'}, User.authenticate()));
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next)=>{
  res.locals.currentUser  = req.user;
  res.locals.error        = req.flash("error");
  res.locals.done         = req.flash("done");
  next();
});
app.use("/",                      router.index);
app.use("/post",                  router.post);
app.use("/post/:post_id/comment", router.comment);
app.use(router.pageNotFound);



// APP LISTEN
app.listen(config.PORT, config.IP, () => {
  console.log(config.STATUS)
});