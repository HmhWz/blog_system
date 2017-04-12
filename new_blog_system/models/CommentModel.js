const mongoose = require('mongoose');
const moment = require('moment');

const CommentSchema = new mongoose.Schema({
	blogId: {type: mongoose.Schema.Types.ObjectId, ref: 'blogs'}, //该评论所属文章
	authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}, //该评论作者
	content: String,
	createAt: {type: String, default: moment().format('LLL')}
});

CommentSchema.pre('save', function(next){
	if(this.isNew){
		this.createAt = moment().format('LLL');
	}
	next();
});

CommentSchema.index({blogId: 1, _id: -1});

CommentSchema.statics = {
	findAll(callback){
		//按时间取出所有Comment
		return this.find({}).sort('createAt').exec(callback);
	},
	findCommentsByBlog(blog, callback){
		return this
			.find({blogId: blog._id})
			.populate('authorId')
			.sort({_id: -1})
			.exec(callback);
	}
};

module.exports = mongoose.model('comments', CommentSchema);