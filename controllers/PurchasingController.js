'use strict';

var response = require('../config/res');
var connection = require('../config/database/conn');
var hdbext = require('@sap/hdbext');

exports.index = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select   Q1."DocEntry", Q1."DocNum",   Q1."DocStatus",  Q1."CardCode",  Q1."OwnerCode", Q1."Comments",  Q1."CardName",  Q1."NumAtCard",  SUBSTRING(Q1."CreateDate",1,10) as "CreateDate",  SUBSTRING(Q1."DocDueDate",1,10) as "ShipDate",  Q1."U_DRS_NUMBER_OA",  Q2."ItemCode",  Q2."Dscription",  Q2."Quantity"from 	opor Q1  left join por1 Q2 on Q2."DocEntry" = Q1."DocEntry" where   Q1."CANCELED" = ' + "'" + 'N' + "'" + ' and Q1."DocStatus" = ' + "'" + 'O' + "'" + ' and Q1."OwnerCode" in (' + "'410'" + ',' + "'425'" + ')';

  connection.runQuery(res, sql);
};

exports.outstandingpr = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    var strDate = new Date();
    var shortYear = strDate.getFullYear();

    var sql = 'select "DocNum",SUBSTRING("CreateDate",1,10) AS "CreateDate","Requester","ReqName","Comments",SUBSTRING("ReqDate",1,10) as "ReqDate" from oprq where "DocStatus" = ' + "'" + 'O' + "'" + '';

    connection.runQuery(res, sql);
}

exports.outstandingpo = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    var strDate = new Date();
    var shortYear = strDate.getFullYear();

  var sql = 'select "DocNum", "DocEntry", "NumAtCard", SUBSTRING("CreateDate",1,10) as "CreateDate", SUBSTRING("DocDueDate",1,10) as "ShipDate", "U_DRS_NUMBER_OA", "Comments", "OwnerCode" from opor where "U_DRS_NUMBER_OA" is null and "CANCELED" = ' + "'" + 'N' + "'" + ' and SUBSTRING("CreateDate", 3,2) in (' + req.query.year + ')';

  connection.runQuery(res, sql);
}


exports.outstandingdraft = function(req,res,next)
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select O1."CardName",	O1."ObjType", O1."DocNum", SUBSTRING(O1."DocDate",1,10) as "PostingDate", O1."Comments",O1."Requester",O1."WddStatus",O2."U_NAME" as "ReqName" from odrf O1 left join ousr O2 on O1."Requester" = O2."USER_CODE" where O1."ObjType" in (' + "'22'" + ',' + "'1470000113'" + ') and O1."WddStatus" in (' + "'W'" + ',' + "'-'" + ',' + "'Y'" + ',' + "'P'" + ') and O1."DocStatus" = ' + "'O'" + '';
  connection.runQuery(res, sql);
}

exports.close = function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select "DocEntry", "DocNum" from oprq where "DocStatus" = ' + "'" + 'O' + "'" + ' and "DocNum" in  (' + req.query.code + ')';

  connection.runQuery(res, sql);
};
