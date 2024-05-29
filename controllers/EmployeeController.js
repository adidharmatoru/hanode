'use strict';

var response = require('../config/res');
var connection = require('../config/database/conn');
var hdbext = require('@sap/hdbext');

// start function
exports.data = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select * from ohem where "lastName" LIKE  ' + "'%" + req.query.code + "%'" + ' or "firstName" LIKE  ' + "'%" + req.query.code + "%'" + ' or "middleName" LIKE  ' + "'%" + req.query.code + "%'" + 'limit 20';

  connection.runQuery(res, sql);
};

// exports.dataemployee = function(req, res, next){
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
//   res.setHeader('Access-Control-Allow-Credentials', true); // If needed
//
//   var sql = 'select * from ohem where "Active" != '+ "'Y'" +' order by "empID"';
//
//   connection.runQuery(res, sql);
// }
