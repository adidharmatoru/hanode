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

  var sql = 'select T0."DocNum" as "Nomor SC", T0."callID",T0."custmrName",T1."Name",T2."DocAbs", T5."Name" as "contactperson",  T4."DocNum" as "NomorSO",T0."itemName" as "ItemName", T0."itemCode" as "ItemCode", T0."internalSN" as "SerialNum", T0."BPShipAddr" as "Address", T0."BPPhone1" as "Phone",T4."U_VIT_TOPY" as "TOP",T4."DocTotal" as "Total", SUBSTRING(T0."createDate",1,10) as "createDate", SUBSTRING(T0."cntrctDate",1,10) as "cntrctDate" from oscl T0 join oscs T1 on T0."status"=T1."statusID" left join scl4 T2 on T0."callID"=T2."SrcvCallID" left join rdr1 T3 on T2."DocAbs"=T3."BaseEntry" left join ordr T4 on T3."DocEntry"=T4."DocEntry" left join ocpr T5 on T0."contctCode"=T5."CntctCode" where T0."Series" in (' + "'2475'" + ',' + "'2474'" + ') and T0."status" in (' + "'-3'" + ',' + "'1'" + ',' + "'2'" + ',' + "'3'" + ',' + "'4'" + ',' + "'5'" + ',' + "'6'" + ',' + "'7'" + ',' + "'8'" + ',' + "'9'" + ') order by T0."DocNum" DESC';

  connection.runQuery(res, sql);
};

exports.relationscall = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select "SrcvCallID","DocAbs" from scl4 where "SrcvCallID" = ' + "'" + req.query.code + "'" + '';

  connection.runQuery(res, sql);
};

exports.salesQuotation = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select T3."DocNum" as "DocNum", T2."TrgetEntry" as "TargetEntry" from qut1 T2 left join oqut T3 on T2."DocEntry"=T3."DocEntry" where T3."DocEntry" in (' + req.body.sq + ')';

  connection.runQuery(res, sql);
};

exports.salesOrder= function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    var sql = 'select T3."DocNum" as "DocNum",T3."NumAtCard" as "NoPO",SUBSTRING(T3."TaxDate",1,10) as "TaxDate" ,SUBSTRING(T3."DocDueDate",1,10) as "DocDueDate" , SUBSTRING(T3."DocDate",1,10) as "DocDate", T2."BaseEntry" as "BaseEntry" from rdr1 T2 left join ordr T3 on T2."DocEntry"=T3."DocEntry" where T2."BaseEntry" in (' + req.body.so + ')';

  connection.runQuery(res, sql);
};

exports.Inv = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader ('Access-Control-Allow-Credentials', true); // If needed FORMAT(CAST(T1."U_VIT_TOT" AS DECIMAL(20,6)) , "g16")

  var sql = 'select distinct T0."DocNum" as "SO_no", T2."BaseEntry", T1."TrgetEntry",T2."DocEntry",T3."DocNum" as "no_inv", T0."U_VIT_TOPY" as "TOP",T1."Dscription",SUBSTRING(T3."DocDate",1,10) as "inv_date",T1."Price" as "Price",T3."DocStatus" as "status" from ordr T0 join rdr1 T1 on T0."DocEntry"=T1."DocEntry" join inv1 T2 on T1."TrgetEntry"=T2."BaseEntry" join oinv T3 on T2."DocEntry"=T3."DocEntry" where T0."DocNum" in (' + req.body.inv + ') order by T0."DocNum"';

  connection.runQuery(res, sql);
};
