const dotenv = require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const app = require('./app');

// Database
const DB = process.env.DATABASE
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(con => console.log('Database Connection Succeed!'));

// PORT
const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
})

