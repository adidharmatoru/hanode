'use strict';

var response = require('../config/res');
var connection = require('../config/database/conn');
var hdbext = require('@sap/hdbext');

// start function
exports.data = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var sql = 'select * from ohem where "lastName" LIKE  ' + "'%" + req.query.code + "%'" + ' or "firstName" LIKE  ' + "'%" + req.query.code + "%'" + ' or "middleName" LIKE  ' + "'%" + req.query.code + "%'" + 'limit 20';

  connection.runQuery(res, sql);
};