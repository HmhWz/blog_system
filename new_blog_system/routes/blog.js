const router = require('express').Router();
const BlogModel = require('../models/BlogModel');
const CommentModel = require('../models/CommentModel');

//GET 特定博客页
router.get('/blog/:id', function(req, res, next){
	var id = req.params.id;
	BlogModel.update({_id: id}, {$inc: {pv: 1}}, function(err){
		if(err){
			console.log(err);
		}
	});
	BlogModel.findBlogById(id, function(err, blog){
		if(err){
			console.log(err);
		}
		CommentModel.findCommentsByBlog(blog, function(err, comments){
			if(err){
				console.log(err);
			}
			res.render('blog', {
				title: '特定博客页',
				blog: blog,
				comments: comments
			});
		});
	});
});

//GET 新建博客页
router.get('/newblog', function(req, res, next){
	res.render('newBlog', {
		title: '发表文章页'
	});
});

//POST 提交博客
router.post('/newblog', function(req, res, next){
	let user = req.session.user;
	let new_blog = new BlogModel({
		authorId: user._id,
		title: req.fields.title,
		content: req.fields.content
	});
	new_blog.save(function(err, blog){
		if(err){
			console.log(err);
		}
		req.flash('success', '发表成功');
		return res.redirect('/user?id='+ user._id);
	});

});

module.exports = router;