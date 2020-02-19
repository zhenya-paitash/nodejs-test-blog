let
  userCheck   = {},
  Post        = require("../models/post-model"),
  Comment     = require("../models/comment-model");


// check the user is logged
userCheck.userLogged = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need logged");
  res.redirect('/login')
};

// check the user NOT is logged
userCheck.userNotLogged = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You are already logged in");
  res.redirect('back')
};

// check user author of this post or not
userCheck.userAuthorPost = function (req, res, next) {
  if (req.isAuthenticated()) {
    Post.findById(req.params.post_id, (err, post) => {
      if (err) {
        console.log(err);
        req.flash("error", err.message);
        res.redirect('back')
      } else {
        if (post.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "This is not your post");
          res.redirect('back')
        }
      }
    });
  } else {
    req.flash("error", "You need logged");
    res.redirect('back')
  }
};

// check user author of this comment or not
userCheck.userAuthorComment = function (req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, comm) => {
      if (err) {
        console.log(err);
        req.flash("error", err.message);
        res.redirect('back')
      } else {
        if (comm.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "This is not your post");
          res.redirect('back')
        }
      }
    });
  } else {
    req.flash("error", "You need logged");
    res.redirect('back')
  }
};



module.exports = userCheck;