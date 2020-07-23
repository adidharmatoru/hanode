'use strict';

var connection = require('../config/database/conn');

exports.index = function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var sql = 'select * from oqut where CANCELED = ' + "'" + 'N' + "'" + ' and "DocStatus" = ' + "'" + 'O' + "'" + ' and "DocNum" LIKE  ' + "'%" + req.query.code + "%'" + ' and "OwnerCode" =  ' + "'" + req.query.uid + "'" + 'order by "DocNum" DESC limit 20';

  connection.runQuery(res, sql);
};