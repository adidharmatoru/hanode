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

  var sql = 'select T0."DocNum" as "Nomor SC", T0."callID",T0."custmrName",T1."Name",T2."DocAbs", T5."Name" as "contactperson",  T4."DocNum" as "NomorSO",T0."itemName" as "ItemName", T0."itemCode" as "ItemCode", T0."internalSN" as "SerialNum", T0."BPShipAddr" as "Address", T0."BPPhone1" as "Phone",T4."U_VIT_TOPY" as "TOP",T4."DocTotal" as "Total",SUBSTRING(T7."DocDate",1,10) as "DocDateDO", T7."DocNum" as "DocNumDO",SUBSTRING(T4."DocDate",1,10) as "DocDateSO",T4."DocNum" as "DocNumSO",SUBSTRING(T0."createDate",1,10) as "createDate", SUBSTRING(T0."cntrctDate",1,10) as "cntrctDate", AT."AbsEntry" as "AbsEntry",AT."FileExt" as "FileExt",AT."FileName" as "FileName", AT."trgtPath" as "targetPath" from oscl T0  join oscs T1 on T0."status"=T1."statusID"  left join scl4 T2 on T0."callID"=T2."SrcvCallID"  left join rdr1 T3 on T2."DocAbs"=T3."DocEntry"  left join ordr T4 on T3."DocEntry"=T4."DocEntry"  left join ocpr T5 on T0."contctCode"=T5."CntctCode" left join dln1 T6 on T2."DocAbs" = T6."BaseEntry" left join odln T7 on T6."DocEntry" =T7."DocEntry" left join ATC1 AT on AT."AbsEntry"=T0."AtcEntry" where T0."Series" = ' + "'" + req.query.series + "'" + ' order by T0."DocNum" DESC';

  connection.runQuery(res, sql);
};


exports.correctiveDetail = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select distinct T0."DocNum" as "Nomor SC", T0."callID",T0."custmrName",T1."Name",T2."DocAbs", T5."Name" as "contactperson",  T4."DocNum" as "NomorSO",T0."itemName" as "ItemName", T0."itemCode" as "ItemCode", T0."internalSN" as "SerialNum", T0."BPShipAddr" as "Address", T0."BPPhone1" as "Phone",T4."U_VIT_TOPY" as "TOP",T4."DocTotal" as "Total",SUBSTRING(T7."DocDate",1,10) as "DocDateDO", T7."DocNum" as "DocNumDO",SUBSTRING(T4."DocDate",1,10) as "DocDateSO",T4."DocNum" as "DocNumSO",SUBSTRING(T0."createDate",1,10) as "createDate", SUBSTRING(T0."cntrctDate",1,10) as "cntrctDate" from oscl T0  join oscs T1 on T0."status"=T1."statusID"  left join scl4 T2 on T0."callID"=T2."SrcvCallID"  left join rdr1 T3 on T2."DocAbs"=T3."DocEntry"  left join ordr T4 on T3."DocEntry"=T4."DocEntry"  left join ocpr T5 on T0."contctCode"=T5."CntctCode" left join dln1 T6 on T2."DocAbs" = T6."BaseEntry" left join odln T7 on T6."DocEntry" =T7."DocEntry" where T0."callID" = ' + "'" + req.query.code + "'" + ' order by T0."DocNum" DESC';

  connection.runQuery(res, sql);
};

exports.relationscall = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select distinct "SrcvCallID","DocAbs" from scl4 where "SrcvCallID" in (' + req.body.code + ')';

  connection.runQuery(res, sql);
};

exports.salesQuotation = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select distinct T3."DocNum" as "DocNum", T2."TrgetEntry" as "TargetEntry", T3."DocEntry" as "DocEntry",SUBSTRING(T3."CreateDate",1,10) as "CreateDate",SUBSTRING(T4."CreateDate",1,10) as "CreateDateSO",T3."DocStatus" as "StatusSQ" from qut1 T2 left join oqut T3 on T2."DocEntry"=T3."DocEntry" left join rdr1 T5 on T3."DocEntry" = T5."BaseEntry" left join ordr T4 on T5."DocEntry" = T4."DocEntry" left join scl4 T6 on T2."DocEntry"=T6."DocAbs" where T3."Series" ='+ "'2149'" +' and T2."DocEntry" in (' + req.body.sq + ')';

  connection.runQuery(res, sql);
};

exports.salesOrder= function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    var sql = 'select distinct T3."DocNum" as "DocNum",T3."NumAtCard" as "NoPO",SUBSTRING(T3."TaxDate",1,10) as "TaxDate" ,SUBSTRING(T3."DocDueDate",1,10) as "DocDueDate" , SUBSTRING(T3."DocDate",1,10) as "DocDateSO", T3."Series",T2."BaseEntry" as "BaseEntry",T4."SrcvCallID" as "callID",SUBSTRING(T6."DocDueDate",1,10) as "DocDueDateDO",SUBSTRING(T3."CreateDate",1,10) as "CreateDate" from rdr1 T2  left join ordr T3 on T2."DocEntry"=T3."DocEntry"  left join scl4 T4 on T2."DocEntry"=T4."DocAbs" left join dln1 T5 on T5."BaseEntry"=T4."DocAbs"  left join odln T6 on T5."DocEntry"=T6."DocEntry" where T2."DocEntry" in (' + req.body.so + ') and T3."Series"in  ('+"'1675'"+','+ "'2068'"+')';

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

exports.delivery= function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    var sql = 'select distinct T3."DocNum" as "DocNum", T3."DocEntry" as "DocEntry",T4."SrcvCallID" as "callID",SUBSTRING(T5."DocDate",1,10) as "PostingDateSO",SUBSTRING(T3."DocDueDate",1,10) as "DocDueDateDO" from dln1 T2 left join odln T3 on T2."DocEntry"=T3."DocEntry" left join scl4 T4 on T2."BaseEntry"=T4."DocAbs" left join rdr1 T5 on T5."BaseEntry"=T4."DocAbs" where T3."Series" in ('+"'1963'"+','+"'1615'"+','+"'1346'"+') and T2."DocEntry" in (' + req.body.dlv + ')';

  connection.runQuery(res, sql);
};
