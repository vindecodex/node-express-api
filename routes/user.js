const express = require('express');
const userController = require('../controllers/user');

// Routes
// Now we use Mounting Routes
const router = express.Router();

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
