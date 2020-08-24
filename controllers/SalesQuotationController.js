'use strict';

var connection = require('../config/database/conn');

exports.index = function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select "DocNum" as "docnum", "DocEntry" as "dockey", SUBSTR_BEFORE("DocDate", ' + "'" + '.' + "'" + ') as "DocDate" from oqut where CANCELED = ' + "'" + 'N' + "'" + ' and "DocStatus" = ' + "'" + 'O' + "'" + ' and "OwnerCode" =  ' + "'" + req.query.uid + "'" + 'order by "DocNum" DESC';

  connection.runQuery(res, sql);
};

exports.addSQ = function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select * from oqut where CANCELED = ' + "'" + 'N' + "'" + ' and "DocStatus" = ' + "'" + 'O' + "'" + ' and "DocNum" LIKE  ' + "'%" + req.query.code + "%'" + ' and "OwnerCode" =  ' + "'" + req.query.uid + "'" + 'order by "DocNum" DESC limit 20';

  connection.runQuery(res, sql);
};

exports.close = function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select "DocEntry" from oqut where "DocStatus" = ' + "'" + 'O' + "'" + ' and "DocNum" in  (' + "'" + req.query.code + "'" + ')';

  connection.runQuery(res, sql);
};