'use strict';

var response = require('../config/res');
var connection = require('../config/database/conn');
var hdbext = require('@sap/hdbext');

// start function
exports.corrective = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select T0."DocNum" as "Nomor SC", T0."callID",T0."custmrName",T1."Name",T2."DocAbs" from oscl T0 join oscs T1 on T0."status"=T1."statusID" left join scl4 T2 on T0."callID"=T2."SrcvCallID" where T0."Series" in (' + "'2475'" + ',' + "'2474'" + ') and T0."status" in (' + "'-3'" + ',' + "'1'" + ',' + "'2'" + ',' + "'3'" + ',' + "'4'" + ',' + "'5'" + ',' + "'6'" + ',' + "'7'" + ',' + "'8'" + ',' + "'9'" + ') order by T0."DocNum" DESC';

  connection.runQuery(res, sql);
};

exports.salesQuotation = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select T3."DocNum" from qut1 T2 left join oqut T3 on T2."DocEntry"=T3."DocEntry" where T2."TrgetEntry" in (' + req.body.sq + ')';

  connection.runQuery(res, sql);
};

exports.salesOrder= function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select T3."DocNum" as "DocNum",T3."NumAtCard" as "NoPO",T3."DocDueDate" as SUBSTRING(T3."DocDueDate",1,10),T3."DocDate" as SUBSTRING(T3."DocDate",1,10) from rdr1 T2 left join ordr T3 on T2."DocEntry"=T3."DocEntry" where T2."BaseEntry" in (' + req.body.so + ')';

  connection.runQuery(res, sql);
};
