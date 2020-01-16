const express = require('express');
const userController = require('../controllers/user');

// Routes
// Now we use Mounting Routes
const router = express.Router();

// Middleware Param
router.param('id', userController.checkUserID);
const chainedMiddleware = (req, res, next) => {
  console.log('Im a chained middleware on get method in route /');
  next();
};

router
  .route('/')
  .get(chainedMiddleware, userController.getUsers)
  .post(userController.createUser);
// We Specify common routes for each methods to avoid redundant
router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
