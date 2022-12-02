'use strict';

const connection = require('../config/database/conn');

// start function
exports.index = function(req, res) {
  var docnum = req.query.docnum || "'%'";
  var sql = 'select * from oscl limit 1'

  connection.runQuery(res, sql);
};

exports.close = function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select "callID" as "DocEntry", "DocNum" from oscl where "status" != -1 and "DocNum" in  (' + req.query.code + ')';

  connection.runQuery(res, sql);
};

exports.series = function(req,res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select "Series", right("SeriesName" , 2) as "SeriesName", "SeriesName" from nnm1 where right("SeriesName" , 2) in (' + req.query.year + ') and left("SeriesName" , 2)= ' + "'" + 'SC' + "'" + ' order by "Series" desc';

  connection.runQuery(res, sql);
}

exports.salesQuotation = function(req,res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select "DocNum","DocEntry" from oqut where "DocStatus" = ' + "'" + 'O' + "'" + ' and "OwnerCode" in ('+"'579'"+','+ "'609'"+','+ "'648'"+') AND "DocNum" LIKE  ' + "'%" + req.query.code + "%'" + '';

  connection.runQuery(res, sql);
}
