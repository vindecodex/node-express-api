const fs = require('fs');

// JSON.parse convert json to javascript object
let persons = JSON.parse(fs.readFileSync(`${__dirname}/../data/persons.json`));

// Middleware
// With the help of Middleware query params we can check if val is existing
exports.checkPersonID = (req, res, next, val) => {
  // get the specific elements if it equals to what we are looking for
  const person = persons.find((person) => {
    return person.id == val
  });
  if (!person) {
    return res.status(404).json({
      status: 'not found',
      message: `person with id ${val} not found`
    })
  }
  // we dont need to forget to add next() if we are creating middlewares
  next();
}
// Handlers or Controllers
exports.createPerson = (req, res) => {
  let genID = persons.length;
  const newPerson = Object.assign({ id: genID }, req.body);
  persons.push(newPerson);
  fs.writeFile(`${__dirname}/../data/persons.json`, JSON.stringify(persons), err => {
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
}
exports.getPersons = (req, res) => {
  // sending data to browser with status code and convert data to json 
  res.status(200).json({
    status: 'success',
    results: persons.length,
    data: {
      persons
    }
  });
}
exports.getPersonById = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      person
    }
  });
}
exports.updatePerson = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      message: 'need to add logic'
    }
  })
}
exports.deletePerson = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      message: 'need to add logic'
    }
  })
}
