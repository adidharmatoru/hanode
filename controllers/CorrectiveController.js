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

  var sql = 'select   T0."DocNum" as "Nomor SC",   T0."callID",   T0."custmrName", T0."customer" as "CardCode",  T0."subject" as "subject",   N1."SeriesName" as "SeriesName", N1."Series" as "Series",  T1."Name",  T2."DocAbs",   T5."Name" as "contactperson",   T4."DocNum" as "NomorSO",   T0."itemName" as "ItemName",   T0."itemCode" as "ItemCode",   T0."internalSN" as "SerialNum",   T0."BPShipAddr" as "Address",   T0."BPPhone1" as "Phone",   T4."U_VIT_TOPY" as "TOP",   T4."DocTotal" as "Total",   T0."BPE_Mail" as "E_mail",  T0."BPShipAddr" as "Address",   SUBSTRING(T4."DocDate", 1, 10) as "DocDateSO",   T4."DocNum" as "DocNumSO",   SUBSTRING(T0."createDate", 1, 10) as "createDate",   SUBSTRING(T0."closeDate", 1, 10) as "closeDate", T0."U_KS_REMARK" as "Remark" , T0."status" as "Status" from   oscl T0   join oscs T1 on T0."status" = T1."statusID"   left join scl4 T2 on T0."callID" = T2."SrcvCallID"   left join rdr1 T3 on T2."DocAbs" = T3."DocEntry" or T2."DocAbs" = T3."BaseEntry"  left join ordr T4 on T3."DocEntry" = T4."DocEntry"   left join ocpr T5 on T0."contctCode" = T5."CntctCode" left join nnm1 N1 on T0."Series" = N1."Series" where    T0."Series" in (' + req.query.series + ') and LEFT(T0."createDate", 4) in (' + req.query.tahun + ') and T0."status" in (' + req.query.status + ') order by   T0."createDate" ASC';

  connection.runQuery(res, sql);
};


exports.correctiveDetail = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select distinct T0."Series" as "Series", N1."SeriesName" as "Series", T0."subject" as "Subject", T0."DocNum" as "Nomor SC", T0."callID",T0."custmrName",T1."Name",T0."customer" as "CardCode",T2."DocAbs", T5."Name" as "contactperson",  T4."DocNum" as "NomorSO",T0."itemName" as "ItemName", T0."itemCode" as "ItemCode", T0."internalSN" as "SerialNum", T0."BPShipAddr" as "Address", T0."BPPhone1" as "Phone",T0."Telephone" as "Phone_2",T4."U_VIT_TOPY" as "TOP",T4."DocTotal" as "Total",SUBSTRING(T7."DocDate",1,10) as "DocDateDO", T0."BPE_Mail" as "E_mail", T7."DocNum" as "DocNumDO",SUBSTRING(T4."DocDate",1,10) as "DocDateSO",T4."DocNum" as "DocNumSO",SUBSTRING(T0."createDate",1,10) as "createDate", SUBSTRING(T0."cntrctDate",1,10) as "cntrctDate" from oscl T0  join oscs T1 on T0."status"=T1."statusID"  left join scl4 T2 on T0."callID"=T2."SrcvCallID"  left join qut1 Q1 on T2."DocAbs" = Q1."DocEntry" left join oqut Q2 on Q1."DocEntry" = Q2."DocEntry" left join rdr1 T3 on Q1."DocEntry" = T3."BaseEntry"   left join ordr T4 on T3."DocEntry"=T4."DocEntry"  left join ocpr T5 on T0."contctCode"=T5."CntctCode" left join dln1 T6 on T2."DocAbs" = T6."BaseEntry" left join odln T7 on T6."DocEntry" =T7."DocEntry" left join NNM1 N1 on T0."Series" = N1."Series" where T0."callID" = ' + "'" + req.query.code + "'" + ' order by T0."DocNum" DESC';

  connection.runQuery(res, sql);
};

exports.relationscall = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select distinct "SrcvCallID","DocAbs" from scl4 where "Object" = 23 and "SrcvCallID" in (' + req.body.code + ')';

  connection.runQuery(res, sql);
};

exports.relationshipscall = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select distinct "SrcvCallID","DocAbs","Object","DocNumber",SUBSTRING("DocPstDate",1,10) as "DocPstDate" from scl4 where "SrcvCallID" = ' + req.body.code + '';

  connection.runQuery(res, sql);
};

exports.salesQuotation = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select T3."DocNum" as "DocNum", T3."CardName", T3."CardCode",  T3."Series" as "Series",   T2."TrgetEntry" as "TargetEntry",   T3."DocEntry" as "DocEntry",   SUBSTRING(T3."CreateDate", 1, 10) as "CreateDate",   SUBSTRING(T4."CreateDate", 1, 10) as "CreateDateSO",   T3."DocStatus" as "StatusSQ",   T7."SeriesName" as "SeriesName",   T2."ItemCode" as "ItemCode",  T3."DocType", T2."U_VIT_FT" as "ServiceSQ", T2."Dscription" as "ItemName",  T2."VatGroup", T2."Price" as "Harga", T3."DocTotal" as "TotalSQ" ,  T2."Price" * T2."Quantity" as "Total", T2."Quantity" as "Qty",T2."U_VIT_QT" as "typeSQTY",T5."U_VIT_QT" as "typeSOTY", T5."U_VIT_FT" as "ServiceSO", T3."NumAtCard" as "NomorPOSQ"  from qut1 T2 left join oqut T3 on T2."DocEntry"=T3."DocEntry" left join rdr1 T5 on T3."DocEntry" = T5."BaseEntry" left join ordr T4 on T5."DocEntry" = T4."DocEntry" left join scl4 T6 on T2."DocEntry"=T6."DocAbs" left join nnm1 T7 on T3."Series" = T7."Series" where T2."DocEntry" in (' + req.body.sq + ')';

  connection.runQuery(res, sql);
};

exports.salesOrder= function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    var sql = 'select distinct T3."DocNum" as "DocNum",T3."DocEntry",T3."NumAtCard" as "NoPO",SUBSTRING(T3."TaxDate",1,10) as "TaxDate" ,SUBSTRING(T3."DocDueDate",1,10) as "DocDueDate" ,T3."CardName", SUBSTRING(T3."DocDate",1,10) as "DocDateSO", T3."Series",T7."SeriesName" as "SeriesName", T2."BaseEntry" as "BaseEntry",T4."SrcvCallID" as "callID",SUBSTRING(T3."CreateDate",1,10) as "CreateDate" from rdr1 T2  left join ordr T3 on T2."DocEntry"=T3."DocEntry"  left join scl4 T4 on T2."DocEntry"=T4."DocAbs" or T2."BaseEntry" = T4."DocAbs" left join dln1 T5 on T5."BaseEntry"=T4."DocAbs"  left join odln T6 on T5."DocEntry"=T6."DocEntry" left join nnm1 T7 on T3."Series" = T7."Series" where T2."BaseEntry" in (' + req.body.so + ') and T4."SrcvCallID"in (' + req.body.code + ') and T3."Series" in  ('+"'1675'"+','+ "'2068'"+','+ "'2712'"+','+"'3205'"+') or T2."DocEntry" in (' + req.body.so + ') and T4."SrcvCallID"in (' + req.body.code + ') and T3."Series" in  ('+"'1675'"+','+ "'2068'"+','+ "'2712'"+','+"'3205'"+')';

  connection.runQuery(res, sql);
};

exports.Inv = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader ('Access-Control-Allow-Credentials', true); // If needed FORMAT(CAST(T1."U_VIT_TOT" AS DECIMAL(20,6)) , "g16")

  var sql = 'select distinct T0."DocNum" as "SO_no", T0."NumAtCard" as "No_PO", T3."DocNum" as "no_inv", T0."U_VIT_TOPY" as "TOP", T0."DocTotal" as "Total_so", T3."CardName" as "CardNameInvoice", T5."CardName" as "CardNameDP" ,T0."CardName" as "CardNameSO", SUBSTRING(T3."DocDate", 1, 10) as "inv_date", T3."DocStatus" as "status", T3."DocTotal" as "Total",T5."DocNum" as "no_dp",T5."DocTotal" as "Total_dp",T3."DocType" as "Typeitem", T7."DocNum" as "DocNumInpay" from ordr T0 join rdr1 T1 on T0."DocEntry"=T1."DocEntry" left join inv1 T2 on T1."TrgetEntry"=T2."BaseEntry" or T1."TrgetEntry" = T2."DocEntry" left join oinv T3 on T2."DocEntry"=T3."DocEntry" LEFT OUTER JOIN INV9 T4 ON T3."DocEntry" = T4."DocEntry" left join dpi1 T8 on T1."DocEntry" = T8."BaseEntry" left join odpi T5 on T8."DocEntry" = T5."DocEntry" left join rct2 T6 on T5."DocEntry" = T6."DocEntry" and T6."InvType" = 204 or T3."DocEntry" = T6."DocEntry" and T6."InvType" = 13 left join orct T7 on T6."DocNum" = T7."DocEntry" where T0."DocNum" in (' + req.body.inv + ') and T0."CANCELED" = ' + "'" + 'N' + "'" + ' order by T0."DocNum"';

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

    var sql = 'select distinct T3."DocNum" as "DocNum", T3."DocEntry" as "DocEntry",T4."SrcvCallID" as "callID",SUBSTRING(T5."DocDate",1,10) as "PostingDateSO",SUBSTRING(T3."DocDueDate",1,10) as "DocDueDateDO" from dln1 T2 left join odln T3 on T2."DocEntry"=T3."DocEntry" left join rdr1 T5 on T2."BaseEntry" = T5."DocEntry"   left join scl4 T4 on T5."DocEntry" = T4."DocAbs" or T5."BaseEntry" = T4."DocAbs" where T3."Series" in (' + "'1963'" + ',' + "'1615'" + ',' + "'1346'" + ',' + "'2639'" + ',' + "'3155'" + ',' + "'3156'" + ') and T2."BaseEntry" in (' + req.body.dlv + ') and T2."BaseType" = 17';

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

    var sql = 'select "DocNum","callID" from oscl order by "callID" DESC';

  connection.runQuery(res, sql);
};

exports.callid= function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    var sql = 'select distinct T3."DocNum" as "DocNum",T3."DocEntry",T3."NumAtCard" as "NoPO",SUBSTRING(T3."TaxDate",1,10) as "TaxDate" ,SUBSTRING(T3."DocDueDate",1,10) as "DocDueDate" , SUBSTRING(T3."DocDate",1,10) as "DocDateSO", T3."Series",T2."BaseEntry" as "BaseEntry",T4."SrcvCallID" as "callID",SUBSTRING(T3."CreateDate",1,10) as "CreateDate" from rdr1 T2  left join ordr T3 on T2."DocEntry"=T3."DocEntry"  left join scl4 T4 on T2."DocEntry"=T4."DocAbs" or T2."BaseEntry" = T4."DocAbs" left join oscl T7 on T4."SrcvCallID" = T7."callID" left join dln1 T5 on T5."BaseEntry"=T4."DocAbs"  left join odln T6 on T5."DocEntry"=T6."DocEntry" where T2."BaseEntry" in (' + req.body.so + ') and   T7."Series" in  (' + req.body.series + ') or T2."DocEntry" in (' + req.body.so + ') and  T7."Series" in  (' + req.body.series + ')';

  connection.runQuery(res, sql);
};

exports.sqdariso = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    var sql = 'select   distinct T3."DocNum" as "DocNum",   T3."CardName",   T3."Series" as "Series",   T2."TrgetEntry" as "TargetEntry",   T3."DocEntry" as "DocEntry",   SUBSTRING(T3."CreateDate", 1, 10) as "CreateDate",   SUBSTRING(T4."CreateDate", 1, 10) as "CreateDateSO",   T3."DocStatus" as "StatusSQ",   T7."SeriesName" as "SeriesName",   T2."ItemCode" as "ItemCode",   T2."Dscription" as "ItemName",   T2."VatGroup",   T2."Price" as "Harga", T6."SrcvCallID" as "callID",  T3."DocTotal" as "TotalSQ",   T2."Price" * T2."Quantity" as "Total",   T2."Quantity" as "Qty",   T2."U_VIT_QT" as "typeSQTY" from   qut1 T2   left join oqut T3 on T2."DocEntry" = T3."DocEntry"   left join rdr1 T5 on T3."DocEntry" = T5."BaseEntry"   left join ordr T4 on T5."DocEntry" = T4."DocEntry"   left join scl4 T6 on T2."DocEntry" = T6."DocAbs"   left join nnm1 T7 on T3."Series" = T7."Series" where T2."TrgetEntry" in  (' + req.body.trgetentry + ')';

  connection.runQuery(res, sql);
}
