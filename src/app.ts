import createError from 'http-errors';
import express, { RequestHandler, ErrorRequestHandler  } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

import indexRouter from './routes/index';
import collectionsRouter from './routes/collections';

const app = express();

// Mongoose setup
const mongoDB = `mongodb+srv://danxschz:${process.env.MONGODB_PASSWORD}@portfolio.clt5bgx.mongodb.net/store_app?retryWrites=true&w=majority`;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error:"));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes setup
app.use('/', indexRouter);
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

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
};
app.use(errorRequestHandler);

export default app;
