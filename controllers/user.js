const fs = require('fs');
const userModel = require('./../models/user');

// JSON.parse convert json to javascript object
let users = JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`));

// Middleware
// With the help of Middleware query params we can check if val is existing
exports.checkUserID = (req, res, next, val) => {
  // get the specific elements if it equals to what we are looking for
  const user = users.find((user) => {
    return user.id == val
  });
  if (!user) {
    return res.status(404).json({
      status: 'not found',
      message: `user with id ${val} not found`
    })
  }
  // we dont need to forget to add next() if we are creating middlewares
  next();
}
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
