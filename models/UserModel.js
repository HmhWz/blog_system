const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true
	},
	password: String,
	avatar: String,
	bio: String,
	sex: {type: String, enum:['m', 'f', 's']}
});

UserSchema.index({username: 1});

module.exports = mongoose.model('users', UserSchema);