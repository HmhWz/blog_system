const router = require('express').Router();
const UserModel = require('../models/UserModel');
const path = require('path');
const fs = require('fs');

router.get('/signup', function(req, res, next){
	res.render('signup', {
		title: '注册页'
	});
});

router.post('/signup', function(req, res, next){
	let _user = {
		username: req.fields.username,
		password: req.fields.password,
		avatar: req.files.avatar.path.split(path.sep).pop(),
		sex: req.fields.sex,
		bio: req.fields.bio
	};
	//验证参数是否正确
	try {
		if(_user.username.length >10){
			throw new Error('用户名不能超过10个字符');
		}
		if(_user.password.length <6){
			throw new Error('密码至少为6位');
		}
		if(_user.password.length >16){
			throw new Error('密码最多16位');
		}
		if(req.fields.password !== req.fields.re_password){
			throw new Error('两次密码不相同');
		}
		if(_user.bio.length >40){
			throw new Error('简介过多。。。');
		}
	}
	catch(err) {
		fs.unlink(req.files.avatar.path);
		req.flash('error', err.message);
		return res.redirect('back');
	}

	UserModel.findOne({username: _user.username}, function(err, user){
		if(err){
			console.log(err);
		}
		if(user){
		 	req.flash('error', '用户名已存在');
		  return res.redirect('back');
		}

		let newObj = {
			username: _user.username,
			password: _user.password,
			avatar: _user.avatar,
			bio: _user.bio,
			sex: _user.sex
		};
		let new_user = new UserModel(newObj);
		new_user.save(function(err, user){
			if(err){
				console.log(err);
			}
			req.session.user = user;
			req.flash('success', '注册成功');
			return res.redirect('/user?id='+ user._id); //跳转到个人主页
		});
	});
});

module.exports = router;