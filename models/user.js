const mongoose = require('mongoose');

// Schema
// Also used for validation
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Your Name is Required']
	},
	age: {
		type: Number,
		required: [true, 'Age is Required']
	},
	gender: {
		type: String,
		required: [true, 'Gender is Required']
	},
	securityNumber: {
		type: String,
		required: [true, 'Must have a Security Number'],
		unique: true
	},
	race: {
		type: String,
		default: 'White'
	}
});

// Created model
// Model first letter must be Capital
const User = mongoose.model('User', UserSchema);

module.exports = User;
