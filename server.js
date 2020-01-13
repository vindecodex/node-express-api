const app = require('./app');

// PORT
const port = process.env.PORT || 9000;
console.log(process.env);
app.listen(port, () => {
  console.log(`App running on port ${port}`);
})

