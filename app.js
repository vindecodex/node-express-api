const express = require('express');
const personRoutes = require('./routes/person');

const app = express();

// MIDDLEWARE
app.use(express.json());
// Creating our own MIDDLEWARE
app.use((req,res,next) => {
  console.log(
    req.url,
    req.method,
    ` - ${res.statusCode}`
  );
  next();
})

app.use('/api/v1/persons', personRoutes);

module.exports = app;
