import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';

import 'express-async-errors';
import 'reflect-metadata';
import '../../container';

import '../database/typeorm';

import http from 'http';
import cors from 'cors';

import { CelebrateError } from 'celebrate';
import { JsonWebTokenError } from 'jsonwebtoken';
import AppError from '../../errors/AppError';

import router from './routes';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.BASE_URL_WEB || 'http://localhost:3000',
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err instanceof CelebrateError) {
    console.log(err);

    return response.status(400).json({
      status: 'error',
      message: 'Request invalid, there are errors with data validation',
    });
  }

  if (err instanceof JsonWebTokenError) {
    return response.status(401).json({
      status: 'error',
      message: 'Access token failure',
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

const port = process.env.PORT || 3333;

const serverHttp = http.createServer(app);

serverHttp.listen(port, () => {
  console.log(`started go-form-api in ${port}`);
});
