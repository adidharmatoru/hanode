'use strict';

var response = require('../config/res');
var connection = require('../config/database/conn');
var hdbext = require('@sap/hdbext');

// start function
exports.SQ = function(req, res, next) {
  var sql = 'select * from DM_WO'

  connection.runQuery(res, sql);
};

exports.itemGroupsSold = function(req, res, next) {
  var sql = 'SELECT T3."ItmsGrpNam" as "Item Group", Sum(T1."Quantity") as "Qty Sold", Sum(T1."LineTotal")-sum(T1."GrssProfit") as "Cost of Sold Qty", Sum(T1."GrssProfit")  as "Gross Profit" FROM OINV T0 INNER JOIN INV1 T1 ON T0."DocEntry" = T1."DocEntry" INNER JOIN OITM T2 ON T1."ItemCode" = T2."ItemCode" INNER JOIN OITB T3 ON T2."ItmsGrpCod" = T3."ItmsGrpCod" WHERE T0.CANCELED = ' + "'" + 'N' + "'" + ' and T1."TargetType"<>14 and left(T0."DocDate", 4) >= ' + "'" + '2017' + "'" + ' and left(T0."DocDate", 4) <= ' + "'" + '2019' + "'" + ' GROUP BY T3."ItmsGrpNam"';

  connection.runQuery(res, sql);
};

exports.quotationBackLog = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://reporting.deltasindo.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select sq."DocNum" as "DocNum", sq."CardName" as "Customer", sc."ItemBrand" as "Brand", ct."CntrcTmplt" as "ContractType", ct."ContractID" as "ContractID", left(ct."EndDate", 10) as "ContractEndDate", sc."ItemType" as "Type", sc."ItemCapacity" as "Capacity", sc."ItemMeasurement" as "Measurement", sc."ItemLocation" as Location,sc."ItemCode",left(sc."DocDate", 10) as "EntryDate",left(sq."DocDate", 10)  as "LeaveDate",sc."WODate" as WO_DATE, left(po."DocDate", 10)  as PO_DATE, left(so."DocDate", 10)  as SO_DATE, ddo."DocNum" as DO_DOCNUM, left(ddo."DocDate", 10)  as DO_DATE,inv."DocNum" as INV_DOCNUM,	 sc."Reason" as REJECT_REASON,	 sc."ItemName" as Item, sc."DocSubject" as "Subject",	 sc."ItemSN" as Serial,	 sc."SeriesName" as Series,	 sc."callID" as SC_CallID,	 sc."DocNum" as SC_DocNum,	 sc."ContractID" as Contract,	 sq."DocEntry" as SQ_DocEntry,	 sq."DocNum" as SQ_DOCNUM ,	 left(sq."DocDate", 10) as SQ_DATE from oqut sq full join scl4 sc4 on sc4."DocAbs" = sq."DocEntry" full join FH_OSCL sc on sc."callID" = sc4."SrcvCallID" left join opor po on po."DocEntry" = sq."DocEntry" left join ordr so on po."DocEntry" = sq."DocEntry" full join octr ct on ct."ContractID" = sc."ContractID" left join odln ddo on ddo."DocEntry" = sq."DocEntry" left join oinv inv on inv."DocEntry" = sq."DocEntry" where sq."DocEntry" in  (' + req.query.code + ') and sq."DocStatus" = ' + "'" + 'O' + "'";

  connection.runQuery(res, sql);
};

exports.openServiceCall = function(req, res, next) {
  var sql = 'select "DocNum" from FH_OSCL where "DocStatus" = ' + "'" + 'Open' + "'" + ' and WO = ' + "'" + 'N' + "'" + ' and "SeriesName" like ' + "'%" + 'CONT' + "%'";

  connection.runQuery(res, sql);
};

exports.outstandingSQ = function(req, res, next) {
  var sql = 'select "DocNum", "CardName" from oqut where "DocStatus" = ' + "'" + 'O' + "'";

  connection.runQuery(res, sql);
};

exports.outstandingSO = function(req, res, next) {
  var sql = 'select "DocNum", "CardName" from ordr where "DocStatus" = ' + "'" + 'O' + "'";

  connection.runQuery(res, sql);
};

exports.outstandingDO = function(req, res, next) {
  var sql = 'select "DocNum", "CardName" from odln where "DocStatus" = ' + "'" + 'O' + "'";

  connection.runQuery(res, sql);
};