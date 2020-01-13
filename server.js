const dotenv = require('dotenv').config({ path: './.env' });
const app = require('./app');

// PORT
const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
})

