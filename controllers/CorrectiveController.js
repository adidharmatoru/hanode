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

exports.salesQuotation = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select T3."DocNum" as "DocNum", T2."TrgetEntry" as "TargetEntry" from qut1 T2 left join oqut T3 on T2."DocEntry"=T3."DocEntry" where T2."TrgetEntry" in (' + req.body.sq + ')';

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
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed FORMAT(CAST(T1."U_VIT_TOT" AS DECIMAL(20,6)) , "g16")

  var sql = 'select T0."DocNum" as "SO_no", T2."DocNum" as "no_inv", T0."U_VIT_TOPY" as "pelunasan",SUBSTRING(T2."DocDate",1,10) as "inv_date", T1."U_VIT_TOT" as "TotPrice" from ordr T0 join inv1 T1 on T1."DocEntry" = T0."DocEntry" left join oinv T2 on T0."DocEntry"=T1."DocEntry" where T0."DocNum"  in (' + req.body.inv + ') order by T0."DocNum"';
  // var sql = 'SELECT T1."DocNum",T1."DocDate",T1."DocEntry"from octr T0 join ordr T1 on T1."DocNum" = T0."U_FH_SO_DOCNUM" where T0."U_FH_SO_DOCNUM" in (' + req.body.cid + ') order by T0."U_FH_SO_DOCNUM"';

  connection.runQuery(res, sql);
};
