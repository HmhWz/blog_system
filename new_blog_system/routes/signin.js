const router = require('express').Router();
const UserModel = require('../models/UserModel');

router.get('/signin', function(req, res, next){
	res.render('signin', {
		title: '登录页'
	});
});

router.post('/signin', function(req, res, next){
	let _username = req.fields.username;
	let _password = req.fields.password;
	UserModel.findOne({username: _username}, function(err, user){
		if(err){
			console.log(err);
		}
		if(user){
			if(_password !== user.password){
				req.flash('error', '密码错误');
				return res.redirect('back');
			}
			req.flash('success', '登录成功');
			//用户信息写入session
			req.session.user = user;
			return res.redirect('/user?id='+ user._id);
		}
		else {
			req.flash('error', '该用户不存在');
			return res.redirect('back');
		}
		
	});
});

module.exports = router;