var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var debug = require('debug')('backend:server');
var http = require('http');

const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mongo = require('./database');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api/v1', indexRouter);
app.use('/api/v1/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

var port = normalizePort(process.env.PORT || '4567');
app.set('port', port);

app.listen(port, () => {
	console.log('Starting Nirapottar Barta Backend...');
	console.log('Connecting to database...');

	try {
		mongo.default.init(process.env.ENV === 'development' ? process.env.dev_uri : process.env.uri)
			.then(() => {})
			.catch((error) => {
				throw error;
			});
	} catch (err) {
		console.log('Error occurred, server can\'t start\n', err);
		throw err;
	}
});

module.exports = app;
