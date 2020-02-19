let
  routerIndex   = require("express").Router(),
  routerPost    = require("express").Router({mergeParams: true}),
  routerComment = require("express").Router({mergeParams: true}),
  userCheck     = require("../middleware/middleware"),
  indexRouter   = require("./index-router"),
  postRouter    = require("./post-router"),
  commentRouter = require("./comment-router");


// ======================================== INDEX ========================================
// */...
routerIndex.get("/",                                  indexRouter.indexPage);
routerIndex.get("/signup",  userCheck.userNotLogged,  indexRouter.signupPage);
routerIndex.get("/login",   userCheck.userNotLogged,  indexRouter.loginPage);
routerIndex.get("/logout",  userCheck.userLogged,     indexRouter.logout);
routerIndex.post("/signup", userCheck.userNotLogged,  indexRouter.signup);
routerIndex.post("/login",  userCheck.userNotLogged,  indexRouter.login);


// ======================================== POST ========================================
// */post/...
routerPost.get("/",                                        postRouter.allPostPage);
routerPost.get("/create",        userCheck.userLogged,     postRouter.createPostPage);
routerPost.get("/:post_id",                                postRouter.singlePostPage);
routerPost.get("/:post_id/edit", userCheck.userAuthorPost, postRouter.editPostPage);
routerPost.post("/",             userCheck.userLogged,     postRouter.createPost);
routerPost.put("/:post_id",      userCheck.userAuthorPost, postRouter.editPost);
routerPost.delete("/:post_id",   userCheck.userAuthorPost, postRouter.deletePost);


// ======================================== COMMENT ========================================
// */post/:post_id/comment/...
routerComment.get("/create",           userCheck.userLogged,        commentRouter.createCommentPage);
routerComment.get("/:comment_id/edit", userCheck.userAuthorComment, commentRouter.editCommentPage);
routerComment.post("/create",          userCheck.userLogged,        commentRouter.createComment);
routerComment.put("/:comment_id",      userCheck.userAuthorComment, commentRouter.editComment);
routerComment.delete("/:comment_id",   userCheck.userAuthorComment, commentRouter.deleteComment);



module.exports = {
  index:   routerIndex,
  post:    routerPost,
  comment: routerComment,
  pageNotFound: (req, res)=>{
    req.flash("error", "404 NOT FOUND");
    res.status(404).redirect("back")
  }
};