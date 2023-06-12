'use strict';

var response = require('../config/res');
var connection = require('../config/database/conn');
var hdbext = require('@sap/hdbext');

exports.index = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select   Q1."DocEntry", Q1."DocNum",   Q1."DocStatus",  Q1."CardCode",  Q1."OwnerCode",Q1."Comments",  Q1."CardName",  Q1."NumAtCard",  SUBSTRING(Q1."CreateDate",1,10) as "CreateDate",  SUBSTRING(Q1."DocDueDate",1,10) as "ShipDate",  Q1."U_DRS_NUMBER_OA",  Q2."ItemCode",  Q2."Dscription",  Q2."Quantity"from 	opor Q1  left join por1 Q2 on Q2."DocEntry" = Q1."DocEntry" where   Q1."CANCELED" = ' + "'" + 'N' + "'" + ' and Q1."DocStatus" = ' + "'" + 'O' + "'" + ' and Q1."OwnerCode" = ' + "'" + '410' + "'" + '';

  connection.runQuery(res, sql);
};

exports.outstandingpr = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    var strDate = new Date();
    var shortYear = strDate.getFullYear();

    var sql = 'select "DocNum",SUBSTRING("CreateDate",1,10) AS "CreateDate","Requester","ReqName","Comments" from oprq where "DocStatus" = ' + "'" + 'O' + "'" + ' AND left("CreateDate", 4) = ' + "'" + shortYear + "'" + '';

    connection.runQuery(res, sql);
}
