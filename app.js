const express = require('express');
const fs = require('fs');

const app = express();


// MIDDLEWARE
app.use(express.json());

// JSON.parse convert json to javascript object
let persons = JSON.parse(fs.readFileSync(`${__dirname}/data/persons.json`));

// Handlers or Controllers
const getPersons = (req, res) => {
  // sending data to browser with status code and convert data to json 
  res.status(200).json({
    status: 'success',
    results: persons.length,
    data: {
      persons
    }
  });
};
const getPersonById = (req, res) => {
  const idParam = req.params.id;
  // find returns specific elements if it returns true
  const person = persons.find((person) => {
    return person.id == idParam
  });
  // Error Trapping
  if (person) {
    res.status(200).json({
      status: 'success',
      data: {
        person
      }
    });
  } else {
    res.status(404).json({
      status: 'fail',
      data: {
        error: `Person with ID: ${idParam} not found`
      }
    })
  }
};
const createPerson = (req, res) => {
  let genID = persons.length;
  const newPerson = Object.assign({ id: genID }, req.body);
  persons.push(newPerson);
  fs.writeFile(`${__dirname}/data/persons.json`, JSON.stringify(persons), err => {
    if (err) {
      console.log(err);
      return err;
    }
    // 201 stands for created
    res.status(201).json({
      status: 'success',
      data: {
        person: newPerson
      }
    });
  });
};
const updatePerson = (req, res) => {
  let genID = req.params.id;
  res.status(201).json({
    status: 'success',
    data: {
      message: 'need to add logic'
    }
  })
};
const deletePerson = (req, res) => {
  let genID = req.params.id;
  res.status(201).json({
    status: 'success',
    data: {
      message: 'need to add logic'
    }
  })
}


// We Specify common routes for each methods to avoid redundant
// Routes
app
  .route('/api/v1/persons')
  .get(getPersons)
  .post(createPerson);
app
  .route('/api/v1/persons/:id')
  .get(getPersonById)
  .patch(updatePerson)
  .delete(deletePerson);

module.exports = app;
