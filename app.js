const express = require('express');
const fs = require('fs');

const app = express();

// PORT
const port = 9000;

// MIDDLEWARE
app.use(express.json());

// JSON.parse convert json to javascript object
let persons = JSON.parse(fs.readFileSync(`${__dirname}/data/persons.json`));

// GET REQUEST
app.get('/api/v1/persons', (req, res) => {
  // sending data to browser with status code and convert data to json
  res.status(200).json({
    status: 'success',
    results: persons.length,
    data: {
      persons
    }
  });
});
app.get('/api/v1/persons/:id', (req, res) => {
  const idParam = req.params.id;
  // find returns specific elements if it returns true
  const person = persons.find((person) => {
    return person.id == idParam
  });
  res.status(200).json({
    status: 'success',
    data: {
      person
    }
  });
});

// POST REQUEST
app.post('/api/v1/persons', (req, res) => {
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
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
})
