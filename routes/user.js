const express = require('express');
const userController = require('../controllers/user');

// Routes
// Now we use Mounting Routes
const router = express.Router();

// Using Aliases with the help of Middlewares chaining
// creating a middleware getTop5Oldest which will be the one to manipulate our request and still using the getUsers
router
	.route('/top5old')
	.get(userController.getTopOldest, userController.getUsers);

router
	.route('/')
	.get(userController.getUsers)
	.post(userController.createUser);
// We Specify common routes for each methods to avoid redundant
router
	.route('/:id')
	.get(userController.getUserById)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

module.exports = router;
