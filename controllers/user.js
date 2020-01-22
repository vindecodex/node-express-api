const User = require('./../models/user');

// Handlers or Controllers
// Creating Document
exports.createUser = async (req, res) => {
	try {
		console.log(req.body);
		const newUser = await User.create(req.body);
		res.status(201).json({
			status: 'success',
			newUser
		})
	} catch(err) {
		res.status(400).json({
			status: 'failed',
			message: err
		})
	}
}
// Reading Documents
exports.getUsers = async (req, res) => {
	try {
		// Advance API filtering
		const objQuery = {...req.query};
		// removing query sort,page etc
		const excludedFields = ['page', 'sort', 'limit', 'fields'];
		for ( index in excludedFields ) {
			// we are not going to pass excludedField now we delete them
			delete objQuery[excludedFields[index]];
		}

		let objQueryStr = JSON.stringify(objQuery);

		// allow to use mongo greater than equal less than equal with help of RegExpression
		// sample: localhost:9000/api/v1/users?age[lte]=20
		objQueryStr = objQueryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

		// now query can be chained to any mongoose function
		let query = User.find(JSON.parse(objQueryStr));

		// Sorting
		// sample: localhost:9000/api/v1/users?sort=age&age[lte]=100 ASCENDING ORDER
		// or localhost:9000/api/v1/users?sort=age&age[lte]=-100 DESCENDING ORDER
		
		if (req.query.sort) {
			// so that we can sort multiple
			// example: localhost:9000/api/v1/users?sort=age,name just add - for DESCENDING ORDER
			const sortBy = req.query.sort.split(',').join(' ');
			query = query.sort(sortBy);
		} else {
			// for default it will be DESCENDING ORDER by id if no sort was given
			query = query.sort('-_id');
		}

		// Query Execution
		// after running all the chained function
		const users = await query;
		res.status(200).json({
			status: 'success',
			results: users.length,
			data: {
				users
			}
		});
	} catch(err) {
		res.status(404).json({
			status: 'failed',
			message: err
		});
	}
}
// Reading Specific Document
exports.getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		// other way around User.findOne({ _id: req.params.id });
		res.status(200).json({
			status: 'success',
			data: {
				user
			}
		});
	} catch(err) {
		res.status(404).json({
			status: 'fail',
			messsage: err
		});
	}
}
exports.updateUser = async (req, res) => {
	try {
		// params new will return the new data's while runValidators will check schema validation if it is fill in or has a correct data type
		const user = await User.findByIdAndUpdate(req.params.id, req.body,{
			new: true,
			runValidators: true
		});
		res.status(201).json({
			status: 'success',
			data: {
				user
			}
		})
	} catch(err) {
		res.status(404).json({
			status: 'fail',
			messsage: err
		});
	}
}
// Delete documents
exports.deleteUser = async (req, res) => {
	try {
		// Never send data to client when deleting
		await User.findByIdAndDelete(req.params.id);
		res.status(204).json({
			status: 'success',
		});
	} catch(err) {
		res.status(404).json({
			status: 'fail',
			messsage: err
		});
	}
}
