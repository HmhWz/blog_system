const BlogModel = require('../models/BlogModel');

module.exports = (app)=>{
	app.get('/', function(req, res){
		BlogModel.findAll(function(err, blogs){
			if(err){
				console.log(err);
			}
			res.render('index', {
				title: '首页',
				blogs: blogs
			});
		});
	});
	app.use('/', require('./signin'));
	app.use('/', require('./signup'));
	app.use('/', require('./signout'));
	app.use('/', require('./blog'));
	app.use('/', require('./user'));
	app.use('/', require('./comment'));
	app.use('/', require('./edit'));
};