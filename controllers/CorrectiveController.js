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

  var sql = 'select   T0."DocNum" as "Nomor SC",   T0."callID",   T0."custmrName",   T0."subject" as "subject",   N1."SeriesName" as "Series",  T1."Name",  T2."DocAbs",   T5."Name" as "contactperson",   T4."DocNum" as "NomorSO",   T0."itemName" as "ItemName",   T0."itemCode" as "ItemCode",   T0."internalSN" as "SerialNum",   T0."BPShipAddr" as "Address",   T0."BPPhone1" as "Phone",   T4."U_VIT_TOPY" as "TOP",   T4."DocTotal" as "Total",   T0."BPE_Mail" as "E_mail",  T0."BPShipAddr" as "Address",  SUBSTRING(T7."DocDate", 1, 10) as "DocDateDO",   T7."DocNum" as "DocNumDO",   SUBSTRING(T4."DocDate", 1, 10) as "DocDateSO",   T4."DocNum" as "DocNumSO",   SUBSTRING(T0."createDate", 1, 10) as "createDate",   SUBSTRING(T0."closeDate", 1, 10) as "closeDate",   AT."AbsEntry" as "AbsEntry",   AT."FileExt" as "FileExt",   AT."FileName" as "FileName", T0."U_KS_REMARK" as "Remark" , AT."trgtPath" as "targetPath" from   oscl T0   join oscs T1 on T0."status" = T1."statusID"   left join scl4 T2 on T0."callID" = T2."SrcvCallID"   left join rdr1 T3 on T2."DocAbs" = T3."DocEntry"   left join ordr T4 on T3."DocEntry" = T4."DocEntry"   left join ocpr T5 on T0."contctCode" = T5."CntctCode"   left join dln1 T6 on T2."DocAbs" = T6."BaseEntry"   left join odln T7 on T6."DocEntry" = T7."DocEntry"   left join ATC1 AT on AT."AbsEntry" = T0."AtcEntry"   left join nnm1 N1 on T0."Series" = N1."Series" where    T0."Series" in (' + req.query.series + ') and T0."status" != -1 order by   T0."DocNum" DESC limit 1500 ';

  connection.runQuery(res, sql);
};


exports.correctiveDetail = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select distinct T0."Series" as "Series", N1."SeriesName" as "Series", T0."subject" as "Subject", T0."DocNum" as "Nomor SC", T0."callID",T0."custmrName",T1."Name",T2."DocAbs", T5."Name" as "contactperson",  T4."DocNum" as "NomorSO",T0."itemName" as "ItemName", T0."itemCode" as "ItemCode", T0."internalSN" as "SerialNum", T0."BPShipAddr" as "Address", T0."BPPhone1" as "Phone",T0."Telephone" as "Phone_2",T4."U_VIT_TOPY" as "TOP",T4."DocTotal" as "Total",SUBSTRING(T7."DocDate",1,10) as "DocDateDO", T0."BPE_Mail" as "E_mail", T7."DocNum" as "DocNumDO",SUBSTRING(T4."DocDate",1,10) as "DocDateSO",T4."DocNum" as "DocNumSO",SUBSTRING(T0."createDate",1,10) as "createDate", SUBSTRING(T0."cntrctDate",1,10) as "cntrctDate" from oscl T0  join oscs T1 on T0."status"=T1."statusID"  left join scl4 T2 on T0."callID"=T2."SrcvCallID"  left join qut1 Q1 on T2."DocAbs" = Q1."DocEntry" left join oqut Q2 on Q1."DocEntry" = Q2."DocEntry" left join rdr1 T3 on Q1."DocEntry" = T3."BaseEntry"   left join ordr T4 on T3."DocEntry"=T4."DocEntry"  left join ocpr T5 on T0."contctCode"=T5."CntctCode" left join dln1 T6 on T2."DocAbs" = T6."BaseEntry" left join odln T7 on T6."DocEntry" =T7."DocEntry" left join NNM1 N1 on T0."Series" = N1."Series" where T0."callID" = ' + "'" + req.query.code + "'" + ' order by T0."DocNum" DESC';

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

  var sql = 'select distinct T3."DocNum" as "DocNum", T3."Series" as "Series", T2."TrgetEntry" as "TargetEntry", T3."DocEntry" as "DocEntry",SUBSTRING(T3."CreateDate",1,10) as "CreateDate",SUBSTRING(T4."CreateDate",1,10) as "CreateDateSO",T3."DocStatus" as "StatusSQ" from qut1 T2 left join oqut T3 on T2."DocEntry"=T3."DocEntry" left join rdr1 T5 on T3."DocEntry" = T5."BaseEntry" left join ordr T4 on T5."DocEntry" = T4."DocEntry" left join scl4 T6 on T2."DocEntry"=T6."DocAbs" where T2."DocEntry" in (' + req.body.sq + ')';

  connection.runQuery(res, sql);
};

exports.salesOrder= function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    var sql = 'select distinct T3."DocNum" as "DocNum",T3."NumAtCard" as "NoPO",SUBSTRING(T3."TaxDate",1,10) as "TaxDate" ,SUBSTRING(T3."DocDueDate",1,10) as "DocDueDate" , SUBSTRING(T3."DocDate",1,10) as "DocDateSO", T3."Series",T2."BaseEntry" as "BaseEntry",T4."SrcvCallID" as "callID",SUBSTRING(T3."CreateDate",1,10) as "CreateDate" from rdr1 T2  left join ordr T3 on T2."DocEntry"=T3."DocEntry"  left join scl4 T4 on T2."DocEntry"=T4."DocAbs" left join dln1 T5 on T5."BaseEntry"=T4."DocAbs"  left join odln T6 on T5."DocEntry"=T6."DocEntry" where T2."DocEntry" in (' + req.body.so + ') and T4."SrcvCallID"in (' + req.body.code + ') and T3."Series"in  ('+"'1675'"+','+ "'2068'"+')';

  connection.runQuery(res, sql);
};

exports.Inv = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader ('Access-Control-Allow-Credentials', true); // If needed FORMAT(CAST(T1."U_VIT_TOT" AS DECIMAL(20,6)) , "g16")

  var sql = 'select distinct T0."DocNum" as "SO_no",   T3."DocNum" as "no_inv",   T0."U_VIT_TOPY" as "TOP",   SUBSTRING(T3."DocDate", 1, 10) as "inv_date",   T3."DocStatus" as "status",  T3."DocTotal" as "Total" from ordr T0 join rdr1 T1 on T0."DocEntry"=T1."DocEntry" join inv1 T2 on T1."TrgetEntry"=T2."BaseEntry" join oinv T3 on T2."DocEntry"=T3."DocEntry" where T0."DocNum" in (' + req.body.inv + ') order by T0."DocNum"';

  connection.runQuery(res, sql);
};

exports.DownPayment = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader ('Access-Control-Allow-Credentials', true); // If needed FORMAT(CAST(T1."U_VIT_TOT" AS DECIMAL(20,6)) , "g16")

  var sql = 'select distinct T0."DocNum" as "SO_no", T3."DocNum" as "no_inv", T0."U_VIT_TOPY" as "TOP", SUBSTRING(T3."DocDate", 1, 10) as "inv_date", T3."DocStatus" as "status", T3."DocTotal" as "Total" from ordr T0 join rdr1 T1 on T0."DocEntry" = T1."DocEntry" join dpi1 T2 on T1."DocEntry" = T2."BaseEntry" join odpi T3 on T2."DocEntry" = T3."DocEntry" where T0."DocNum" in  (' + req.body.dpi + ') order by T0."DocNum"';

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

exports.deliveryktb= function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    var sql = 'select distinct cast(t1."Price" as int) as "unitprice",t2."Series" as "Series", cast(t1."LineTotal" as int) as "LineTotal", d1."Dscription",d1."ItemCode", t1."Dscription" as "ItemNameSQ",t1."ItemCode" as "ItemCodeSQ", t1."Quantity" as "qtySQ", d1."Quantity", t2."DocNum" as "NomorSQKTB", d2."DocNum" as "NomorDOKTB" from dln1 d1 full join qut1 t1 on d1."DocEntry" = t1."TrgetEntry" and d1."BaseLine"=t1."LineNum" left join oqut t2 on t1."DocEntry"=t2."DocEntry" left join odln d2 on d1."DocEntry" = d2."DocEntry" where t1."DocEntry" in  (' + req.query.docentrysq + ')';

  connection.runQuery(res, sql);
};

exports.scallinhouse = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    var sql = 'select "DocNum","callID" from oscl where "Series" ='+ "'2475'" +' order by "DocNum" DESC';

  connection.runQuery(res, sql);
};
