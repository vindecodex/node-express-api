const fs = require('fs');

// JSON.parse convert json to javascript object
let persons = JSON.parse(fs.readFileSync(`${__dirname}/../data/persons.json`));

// Handlers or Controllers
exports.getPersons = (req, res) => {
  // sending data to browser with status code and convert data to json 
  res.status(200).json({
    status: 'success',
    results: persons.length,
    data: {
      persons
    }
  });
};
exports.getPersonById = (req, res) => {
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
};
exports.updatePerson = (req, res) => {
  let genID = req.params.id;
  res.status(201).json({
    status: 'success',
    data: {
      message: 'need to add logic'
    }
  })
};
exports.deletePerson = (req, res) => {
  let genID = req.params.id;
  res.status(201).json({
    status: 'success',
    data: {
      message: 'need to add logic'
    }
  })
}

