const router = require('express').Router();
const UserModel = require('../models/UserModel');
const path = require('path');

//GET 资料编辑页面
router.get('/edit', function(req, res, next){
	res.render('edit');
});

//POST 更改资料
router.post('/edit', function(req, res, next){
	let id = req.session.user._id;
	let sex = req.fields.sex;
	let avatar = req.files.avatar.path.split(path.sep).pop(); //得到路径的最后一个子字符串
	let bio = req.fields.bio;
	UserModel.update({_id: id}, {$set: {sex: sex, avatar: avatar, bio: bio}}, function(err){
		if(err){
			console.log(err);
		}
	});
	req.flash('success', '保存成功！');
	return res.redirect('/edit');
});

module.exports = router;