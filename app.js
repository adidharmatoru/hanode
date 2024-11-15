var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var salesQuotationRouter = require('./routes/salesQuotation');
var employeeRouter = require('./routes/employee');
var reportRouter = require('./routes/report');
var salesOrderRouter = require('./routes/salesOrder');
var projectRouter = require('./routes/project');
var marketingRouter = require('./routes/marketing');
var items = require('./routes/items');
var deliveryOrder = require('./routes/deliveryOrder');
var serviceCall = require('./routes/serviceCall');
var scheduling = require('./routes/scheduling');
var reporting = require('./routes/reporting');
var sales = require('./routes/sales');
var corrective = require('./routes/correctivemaintenance');
var assembly = require('./routes/assembly');
var finance = require('./routes/finance');
var purchase = require('./routes/purchasing');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/salesQuotation', salesQuotationRouter);
app.use('/employee', employeeRouter);
app.use('/report', reportRouter);
app.use('/salesOrder', salesOrderRouter);
app.use('/project', projectRouter);
app.use('/marketing', marketingRouter);
app.use('/deliveryOrder', deliveryOrder);
app.use('/reporting', reporting);
app.use('/serviceCall', serviceCall);
app.use('/items', items);
app.use('/scheduling', scheduling);
app.use('/sales', sales);
app.use('/correctivemaintenance', corrective);
app.use('/assembly', assembly);
app.use('/finance', finance);
app.use('/purchasing', purchase);

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
  res.render('error');
});

module.exports = app;
