var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var gamesRouter = require('./routes/games');
var genresRouter = require('./routes/genres');
var salesRouter = require('./routes/sales');
var devsRouter = require('./routes/devs');
var pubsRouter = require('./routes/pubs');
var usersRouter = require('./routes/users');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/games', gamesRouter);
app.use('/genres', genresRouter);
app.use('/sales', salesRouter);
app.use('/devs', devsRouter);
app.use('/pubs', pubsRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
