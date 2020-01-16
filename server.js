const dotenv = require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const app = require('./app');

// Database
const DB = process.env.DATABASE
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
  .then(() => console.log('Database Connection Succeed!'))
  .catch(err => console.log(err));

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
		type: Number,
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

// Passing Data to DB
const testUser = new User({
	name: 'Vincent Villaluna',
	age: 23,
	gender: 'Male',
	securityNumber: 11111
});
testUser.save()
.then(doc => {
	console.log(doc);
})
.catch(err =>  console.log(err));

// PORT
const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
})
