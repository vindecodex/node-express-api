const User = require('./../models/user');
const APIFeatures = require('./../utils/apiFeatures.js');

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

// Middleware
exports.getTopOldest = (req, res, next) => {
	req.query.limit = '5'; // limit the results to 5
	req.query.sort = '-age'; // it will sort to largest age
	req.query.fields = 'name,age'; // it will only display name and age
	next(); // remember when creating a middleware dont forget the next() function from very end
}
// Reading Documents
exports.getUsers = async (req, res) => {
	try {
		// Query Execution
		// new instance for APIFeatures
		const features = new APIFeatures(User.find(), req.query).filter().sort().limitFields().paginate();
		const users = await features.query;
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

// Aggregation Pipeline (Matching and Grouping - provided by mongo but will help us with mongoose accessing it)
exports.userStats = async (req, res) => {
	try {
		const stats = await User.aggregate([
			{
				$match: { age: { $gte: 20 } },
			},
			{
				$group: {
					_id: '$gender' , // we can also group this with null
					// you can specifiy your own key here
					totalUsers: { $sum: 1 }, // it means to increment each iteration of row
					averageAge: { $avg: '$age' }, // $avg is a mongoose aggregation pipeline while $age is our column on db
					youngestAge: { $min: '$age' },
					oldestAge: { $max: '$age' }
				}
			},
			{
				// if we continue from below the keys we are now going to use is keys from above [_id, totalUsers, averageAge..etc]
				$sort: { averageAge: -1 } // use 1 for ASC and -1 for DESC
			},
			// we can repeat match multiple times but using above keys after grouping
			// {
				// $match: { _id: { $ne: 'Female' } },
			// }
		]);
		res.status(200).json({
			status: 'success',
			data: {
				stats
			}
		});

	} catch(err) {
		res.status(404).json({
			status: 'fail',
			message: err
		});
	}
}
