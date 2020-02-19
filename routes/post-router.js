let
  postRouter  = {},
  Post        = require("../models/post-model"),
  Comment     = require("../models/comment-model"),
  sanitize    = require("express-sanitizer");


// ======================================== GET ========================================
// all-posts
postRouter.allPostPage = (req, res)=>{
  Post.find({}, (err, findPosts)=>{
    if (!err) {
      res.render("post/all-posts", {posts: findPosts})
    }
  });
};
// create
postRouter.createPostPage = (req, res)=>{res.render("post/create-post")};
// single-post
postRouter.singlePostPage = (req, res)=>{
  Post.findById(req.params.post_id).populate("comments").exec((err, post)=>{
    // console.log(post);
    if (err) {req.flash("error", err.message); res.redirect("/post")}
    else {
      res.render("post/single-post", {post:post})
    }
  })
};
//edit-post
postRouter.editPostPage = (req, res) => {
  Post.findById(req.params.post_id, (err, post)=>{
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("/post")
    } else {
      res.render("post/edit-post", {post: post})
    }
  });
};


// ======================================== POST ========================================
// CREATE new post
postRouter.createPost = (req, res)=>{
  let data = req.body.post;
  data.description = req.sanitize(req.body.post.description);
  data.author = {id: req.user._id, username: req.user.username};
  Post.create(data, (err, newPostData)=>{
    if (err) { req.flash("error", err.message); console.log(err) }
    else {req.flash("done", `Post ${newPostData.name} has been created!`); console.log(newPostData)}
    res.redirect("/post")
  })
};


// ======================================== PUT ========================================
// EDIT post
postRouter.editPost = (req, res)=>{
  let editPost = req.body.post;
  editPost.description = req.sanitize(req.body.post.description);
  Post.findByIdAndUpdate(req.params.post_id, editPost, (err, newPost)=>{
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("/post");
    } else {
      console.log(newPost);
      req.flash("done", "Post has been edit!");
      res.redirect("/post/" + req.params.post_id)
    }
  })
};


// ======================================== DELETE ========================================
// DELETE post
postRouter.deletePost = (req, res) => {
  Post.findById(req.params.post_id, async function (err, findPost) {
    if (findPost.comments !== []) {
      await findPost.comments.forEach(i => {
        Comment.findByIdAndRemove(i._id, ()=>{})
      })
    }
  });
  Post.findByIdAndRemove(req.params.post_id, (err)=>{
    if(err){
      console.error(err);
      req.flash("error", err.message)
    }
    res.redirect("/post")
  })
};



module.exports = postRouter;