const router = require('express').Router();

router.get('/signout', function(req, res, next){
	req.session.user = null;
	req.flash('success', '登出成功');
	return res.redirect('/');
});

module.exports = router;
