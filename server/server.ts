import express from 'express';
import cors from 'cors';
import routers from './routes';
import { databaseConnection } from './config/connection';
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

databaseConnection;

const app = express();

app.use(cors());

app.use(express.json());

const APP_PORT = process.env.APP_PORT || 3001;

app.use('/api', routers);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'Express Library API'
    },
    servers: [
      {
        url: `${process.env.BASE_URL}:${APP_PORT}`
      }
    ]
  },
  apis: ['./routes/**/index.ts']
};

const specs = swaggerJsDoc(options);

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(specs));

app.get('/', (request, response, next) => {
  response.json({ status: 'running' });
});

app.use(function (request, response, next) {
  response.status(404).send({ error: '404' });
});

app.listen(APP_PORT, () => {
  console.log(`${process.env.BASE_URL}:${APP_PORT}`);
});
