import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import createError from 'http-errors';
import jsonwebtoken from 'jsonwebtoken';

import {
  MONGO_USER,
  MONGO_SECRET,
  MONGOOSE_CONNECT_OBJECT,
  SECRET,
} from './config';


const app = express();
const PORT = 4000;

// Mongo connection URL
const urlMongo = `mongodb+srv://${MONGO_USER}:${MONGO_SECRET}@phoenix0-eojih.gcp.mongodb.net/test?retryWrites=true&w=majority`;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(urlMongo, MONGOOSE_CONNECT_OBJECT);

// bodyParser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS setup
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    data: { message: `Separable app running on  port ${PORT}` },
  });
});

app.use((req, res, next) => next(createError(404, 'File not found')));

app.use((err, req, res, next) => {
  const status = err.status || 500;

  return res.json({
    status: 'fail',
    data: {
      status,
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`git-erkundung running on port ${PORT}`);
});
