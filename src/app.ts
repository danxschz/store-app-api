import createError from 'http-errors';
import express, { RequestHandler, ErrorRequestHandler  } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';

import indexRouter from './routes/index';
import casesRouter from './routes/cases';
import accessoriesRouter from './routes/accessories';
import collectionsRouter from './routes/collections';

const app = express();

// Mongoose setup
const mongoDB = `mongodb+srv://danxschz:${process.env.MONGODB_PASSWORD}@portfolio.clt5bgx.mongodb.net/store_app?retryWrites=true&w=majority`;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error:"));

// Middleware setup
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes setup
app.use('/', indexRouter);
app.use('/cases', casesRouter);
app.use('/accessories', accessoriesRouter);
app.use('/collections', collectionsRouter);

// Catch 404 and forward to error handler
const requestHandler: RequestHandler = function (req, res, next) {
  next(createError(404));
};
app.use(requestHandler);

// Error handler
const errorRequestHandler: ErrorRequestHandler = function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Send the error message 
  res.status(err.status || 500);
  res.send(`Error: ${err.message}`);
};
app.use(errorRequestHandler);

export default app;
