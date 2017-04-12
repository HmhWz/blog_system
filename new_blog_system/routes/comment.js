const router = require('express').Router();
const CommentModel = require('../models/CommentModel');
const BlogModel = require('../models/BlogModel');

//POST 提交评论
router.post('/blog/:id/comment', function(req, res, next){
	let blogId = req.params.id;
	BlogModel.update({_id: blogId}, {$inc: {commentCount: 1}}, function(err){
		if(err){
			console.log(err);
		}
	});
	let new_comment = CommentModel({
		blogId: blogId,
		authorId: req.session.user._id,
		content: req.fields.comment_content
	});
	new_comment.save(function(err, comment){
		if(err){
			console.log(err);
		}
		req.flash('success', '留言成功');
		return res.redirect('/blog/'+ blogId);
	});
});

module.exports = router;