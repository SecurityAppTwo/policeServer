<<<<<<< HEAD
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var mapRouter = require("./routes/map");
var usersRouter = require("./routes/users");
var deRouter = require("./routes/de");
=======
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');


var reportsRouter = require('./routes/reports');
var mapRouter = require('./routes/map');
var usersRouter = require('./routes/users');
const sub= require('./routes/subscription.js');
const subscriptionRouter=sub.router;
const sendEventsToAll=sub.sendEventsToAll;

var deRouter = require('./routes/de');
>>>>>>> 59bfada6e29fd35e34643ec45a2cb6eece92d027

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

<<<<<<< HEAD
app.use("/map", mapRouter);
app.use("/users", usersRouter);
app.use("/de", deRouter);
=======
app.use(
    cors({
        origin: '*'
    })
);

app.use('/reports', reportsRouter);
app.use('/map', mapRouter);
app.use('/users', usersRouter);
app.use('/',subscriptionRouter);
app.use('/de', deRouter);
>>>>>>> 59bfada6e29fd35e34643ec45a2cb6eece92d027

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
