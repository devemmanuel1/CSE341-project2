const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: '2nd Project CSE341 API',
    description: 'API documentation for CSE341 2nd project',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);