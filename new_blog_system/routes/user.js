const router = require('express').Router();
const UserModel = require('../models/UserModel');
const BlogModel = require('../models/BlogModel');

//GET 个人主页
router.get('/user', function(req, res, next){
	let id = req.query.id;
	//判断进入此用户主页的是否本人
	if(req.session.user._id === id){
		res.locals.isAuthor = true;
	}
	UserModel.findOne({_id: id}, function(err, user){
		if(err){
			console.log(err);
		}
		//找到该用户下的所有博客
		BlogModel.findBlogsByAuthor(user, function(err, blogs){
			res.render('user', {
				title: '个人主页',
				blogs: blogs,
				author: user
			});
		});
	});
});

module.exports = router;