import express from 'express';
import cors from 'cors';
import routers from './routes';
import { databaseConnection } from './config/connection';

databaseConnection;

const app = express();

app.use(cors());

app.use(express.json());

const APP_PORT = process.env.APP_PORT || 3001;

app.use('/api', routers);

app.get('/', (request, response, next) => {
  response.json({ status: "running" });
});

app.use(function (request, response, next) {
  response.status(404).send({ error: "404" });
});

app.listen(APP_PORT, () => {
  console.log(`${process.env.BASE_URL}:${APP_PORT}`);
});