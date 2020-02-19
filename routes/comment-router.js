let
  commentRouter = {},
  Post          = require("../models/post-model"),
  Comment       = require("../models/comment-model");



// ======================================== GET ========================================
// CREATE comment page
commentRouter.createCommentPage = (req, res)=>{
  res.render("comment/create-comment", {post_id: req.params.post_id})
};
// EDIT comment page
commentRouter.editCommentPage = (req, res)=>{
  let post_id = req.params.post_id;
  Comment.findById(req.params.comment_id, (err, comm)=>{
    if (err) { req.flash("error", err.message); res.redirect("back") }
    else { res.render("comment/edit-comment", {comment:comm, post_id:post_id}) }
  })
};


// ======================================== POST ========================================
// CREATE comment
commentRouter.createComment = (req, res) => {
  Post.findById(req.params.post_id, (err, findPost)=>{
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      return res.redirect("/post")
    } else {
      // console.log(findPost);
      Comment.create({
        text: req.body.comment,
        author: {
          id: req.user._id,
          username: req.user.username
        },
        postId: req.params.post_id
      }, async function(err, newComment) {
        if (err) {
          console.log(err);
          req.flash("error", err.message);
          return res.redirect("/post")
        } else {
          // console.log(newComment);
          await newComment.save();
          findPost.comments.push(newComment);
          await findPost.save();
          res.redirect(`/post/${req.params.post_id}`)
        }
      })
    }
  });
};


// ======================================== PUT ========================================
// EDIT comment
commentRouter.editComment = (req, res)=>{
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comm)=>{
    if (err) { req.flash("error", err.message); res.redirect("/post") }
    else { req.flash("done", "Success!"); res.redirect("/post/" + req.params.post_id) }
  })
};


// ======================================== DELETE ========================================
// DELETE comment
commentRouter.deleteComment = (req, res)=>{
  Comment.findByIdAndRemove(req.params.comment_id, (err, log)=>{
    if (err) { req.flash("error", err.message) }
    else { req.flash("done", "Coment has removed!") }
    res.redirect("/post/"+req.params.post_id)
  })
};



module.exports = commentRouter;