const mongoose = require('mongoose');
const moment = require('moment');

const BlogSchema = new mongoose.Schema({
	authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
	title: String,
	content: String,
	pv: {type: Number, default: 0},
	commentCount: {type: Number, default: 0},
	createAt: {type: String, default: moment().format('LLL')}
});

BlogSchema.pre('save', function(next){
	if(this.isNew){
		this.createAt = moment().format('LLL');
	}
	next();
});

BlogSchema.index({authorId: 1, _id: -1}); //按博客创建时间降序排列

BlogSchema.statics = {
	findAll(callback){
		//按时间取出最新10篇blog
		return this
			.find({})
			.limit(10)
			.populate('authorId')
			.sort({_id: -1})
			.exec(callback);
	},
	findBlogById(id, callback){
		return this
			.findOne({_id: id})
			.populate('authorId') //该篇博客作者信息
			.exec(callback);
	},
	//根据作者找到他的所有博客
	findBlogsByAuthor(author, callback){
		return this
			.find({authorId: author._id})
			.populate('authorId')
			.sort({_id: -1})
			.exec(callback);
	}
};

module.exports = mongoose.model('blogs', BlogSchema);