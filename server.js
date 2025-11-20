const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require("./data/database");
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// main routes
app.use("/", require("./routes"));

// swagger docs route — place AFTER your main routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// start server after database connection
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database connected and server running on port ${port}`);
      console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
    });
  }
});





