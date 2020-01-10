const express = require('express');
const personRoutes = require('./routes/person-routes');

const app = express();

// MIDDLEWARE
app.use(express.json());

app.use('/api/v1/persons', personRoutes);

module.exports = app;
