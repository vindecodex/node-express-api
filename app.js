const express = require('express');
const userRoutes = require('./routes/user');

const app = express();

// MIDDLEWARE
app.use(express.json());
// Creating our own MIDDLEWARE
app.use((req,res,next) => {
  console.log(
    `${req.method} - `,
    req.url,
    ` - ${res.statusCode}`
  );
  next();
})

app.use('/api/v1/users', userRoutes);

module.exports = app;
