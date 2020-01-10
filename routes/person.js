const express = require('express');
const personController = require('../controllers/person');

// Routes
// Now we use Mounting Routes
const router = express.Router();

// Middleware Param
router.param('id', personController.checkPersonID);

router
  .route('/')
  .get(personController.getPersons)
  .post(personController.createPerson);
// We Specify common routes for each methods to avoid redundant
router
  .route('/:id')
  .get(personController.getPersonById)
  .patch(personController.updatePerson)
  .delete(personController.deletePerson);

module.exports = router;
