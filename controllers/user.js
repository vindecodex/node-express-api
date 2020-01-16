const fs = require('fs');
const userModel = require('./../models/user');

// Handlers or Controllers
exports.createUser = (req, res) => {
  let genID = users.length;
  const newUser = Object.assign({ id: genID }, req.body);
  persons.push(newUser);
  fs.writeFile(`${__dirname}/../data/users.json`, JSON.stringify(users), err => {
    if (err) {
      console.log(err);
      return err;
    }
    // 201 stands for created
    res.status(201).json({
      status: 'success',
      data: {
        person: newUser
      }
    });
  });
}
exports.getUsers = (req, res) => {
  // sending data to browser with status code and convert data to json 
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
}
exports.getUserById = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
}
exports.updateUser = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      message: 'need to add logic'
    }
  })
}
exports.deleteUser = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      message: 'need to add logic'
    }
  })
}
