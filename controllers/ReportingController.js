'use strict';

var response = require('../config/res');
var connection = require('../config/database/conn');
var hdbext = require('@sap/hdbext');

exports.solution = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  // var sql = 'select * from oitm T1 Where "ItemName" LIKE ' + "'%"  + req.query.code + "%'" + ' order by T1."ItemCode" limit 5';
  var sql = 'select "SltCode" from oslt order by "SltCode" desc';
  connection.runQuery(res, sql);
};
