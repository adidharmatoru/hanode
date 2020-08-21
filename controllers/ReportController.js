'use strict';

var response = require('../config/res');
var connection = require('../config/database/conn');
var hdbext = require('@sap/hdbext');

// start function
exports.itemQty = function(req, res, next) {
  var sql = 'select "ItemCode", "ItemName", "OnHand", "IsCommited", "OnOrder", U_DM_CAPACITY, U_DM_VOLTAGE, U_DM_PHASE, U_DM_TYPE, U_DM_MODEL, U_DM_STATUS, U_DM_BATTERY, U_DM_COO, U_DM_MEASUREMENT from oitm'

  connection.runQuery(res, sql);
};

exports.perWarehouse = function(req, res, next) {
  var sql = 'select a."ItemCode", a."ItemName", a."OnHand", a."IsCommited", a."OnOrder", a."BuyUnitMsr", a.U_DM_CAPACITY, a.U_DM_VOLTAGE, a.U_DM_PHASE, a.U_DM_TYPE, a.U_DM_MODEL, a.U_DM_STATUS, a.U_DM_BATTERY, a.U_DM_COO, a.U_DM_MEASUREMENT, b."WhsCode", b."OnHand" as "BOnHand" from oitm a right join oitw b on a."ItemCode" = b."ItemCode" WHERE b."OnHand" > ' + "'" + '0' + "'"

  connection.runQuery(res, sql);
};

exports.itemGroupsSold = function(req, res, next) {
  var sql = 'SELECT T3."ItmsGrpNam" as "Item Group", Sum(T1."Quantity") as "Qty Sold", Sum(T1."LineTotal")-sum(T1."GrssProfit") as "Cost of Sold Qty", Sum(T1."GrssProfit")  as "Gross Profit" FROM OINV T0 INNER JOIN INV1 T1 ON T0."DocEntry" = T1."DocEntry" INNER JOIN OITM T2 ON T1."ItemCode" = T2."ItemCode" INNER JOIN OITB T3 ON T2."ItmsGrpCod" = T3."ItmsGrpCod" WHERE T0.CANCELED = ' + "'" + 'N' + "'" + ' and T1."TargetType"<>14 and left(T0."DocDate", 4) >= ' + "'" + '2017' + "'" + ' and left(T0."DocDate", 4) <= ' + "'" + '2019' + "'" + ' GROUP BY T3."ItmsGrpNam"';

  connection.runQuery(res, sql);
};

exports.quotationBackLog = function(req, res, next) {
  var sql = 'select sq."DocNum" as "docnum", sq."CardName" as "Customer", sc."ItemBrand" as "Brand", ct."CntrcTmplt" as "ContractType", ct."ContractID" as "ContractID", left(ct."EndDate", 10) as "ContractEndDate", sc."ItemType" as "Type", sc."ItemCapacity" as "Capacity", sc."ItemMeasurement" as "Measurement", sc."ItemLocation" as Location,sc."ItemCode",left(sc."DocDate", 10) as "EntryDate",left(sq."DocDate", 10)  as "LeaveDate",sc."WODate" as WO_DATE, left(so."DocDate", 10)  as PO_DATE, left(so."DocDueDate", 10)  as SO_DATE, ddo."DocNum" as DO_DOCNUM, left(ddo."DocDate", 10)  as DO_DATE,inv."DocNum" as INV_DOCNUM,	 sc."Reason" as REJECT_REASON,	 sc."ItemName" as Item, sc."DocSubject" as "Subject",	 sc."ItemSN" as Serial,	 sc."SeriesName" as Series,	 sc."callID" as SC_CallID,	 sc."DocNum" as SC_DocNum,	 sc."ContractID" as Contract,	 sq."DocEntry" as SQ_DocEntry,	 sq."DocNum" as SQ_DOCNUM ,	 left(sq."DocDate", 10) as SQ_DATE from oqut sq full join scl4 sc4 on sc4."DocAbs" = sq."DocEntry" full join FH_OSCL sc on sc."callID" = sc4."SrcvCallID" left join ordr so on so."DocEntry" = sq."DocEntry" full join octr ct on ct."ContractID" = sc."ContractID" left join odln ddo on ddo."DocEntry" = sq."DocEntry" left join oinv inv on inv."DocEntry" = sq."DocEntry" where sq."DocStatus" = ' + "'" + 'O' + "'";

  connection.runQuery(res, sql);
};

exports.openServiceCall = function(req, res, next) {
  var sql = 'select ou."DocNum", n."SeriesName" as "Series", ou."itemName", ou."itemGroup", ou."internalSN", SUBSTR_BEFORE(ou."createDate", ' + "'" + ' ' + "'" + ') as "DocDate", ou."custmrName" as "CardName", hr."lastName", hr."firstName", hr."middleName" from oscl ou left join ohem hr on hr."userId" = ou."assignee" left join nnm1 n on ou."Series" = n."Series" where ou."status" <> ' + "'" + '-1' + "'"

  connection.runQuery(res, sql);
};

exports.outstandingSQ = function(req, res, next) {
  var sql = 'select ou."DocNum", ou."CardName" , n."SeriesName" as "Series", SUBSTR_BEFORE(ou."DocDate", ' + "'" + ' ' + "'" + ') as "DocDate", hr."lastName", hr."firstName", hr."middleName" from oqut ou join ohem hr on hr."empID" = ou."OwnerCode" left join nnm1 n on ou."Series" = n."Series" where "DocStatus" = ' + "'" + 'O' + "'" + 'and CANCELED = ' + "'" + 'N' + "'";

  connection.runQuery(res, sql);
};

exports.outstandingSO = function(req, res, next) {
  var sql = 'select ou."DocNum", ou."CardName", n."SeriesName" as "Series", SUBSTR_BEFORE(ou."DocDate", ' + "'" + ' ' + "'" + ') as "DocDate", hr."lastName", hr."firstName", hr."middleName" from ordr ou join ohem hr on hr."empID" = ou."OwnerCode" left join nnm1 n on ou."Series" = n."Series" where "DocStatus" = ' + "'" + 'O' + "'" + 'and CANCELED = ' + "'" + 'N' + "'";

  connection.runQuery(res, sql);
};

exports.outstandingDO = function(req, res, next) {
  var sql = 'select ou."DocNum", ou."CardName", n."SeriesName" as "Series", SUBSTR_BEFORE(ou."DocDate", ' + "'" + ' ' + "'" + ') as "DocDate", hr."lastName", hr."firstName", hr."middleName" from odln ou join ohem hr on hr."empID" = ou."OwnerCode" left join nnm1 n on ou."Series" = n."Series" where "DocStatus" = ' + "'" + 'O' + "'" + 'and CANCELED = ' + "'" + 'N' + "'";

  connection.runQuery(res, sql);
};

exports.salesOrderPerProject = function(req, res, next) {
  var sql = 'SELECT T0."Project",T0."DocDate",T2."SlpName",T1."CardName",T0."Dscription",T0."Quantity",T0."Price",T0."LineTotal",d1."U_VIT_NPAN", d1."DocNum" FROM RDR1 T0 JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry" JOIN ODLN d1 on d1."DocEntry" = T0."DocEntry" JOIN OSLP T2 ON T2."SlpCode" = T1."SlpCode" where T0."Project" is not null and T0."Project" != ' + "'" + '' + "'" + 'and T0."ItemCode" is not null order by T0."DocDate" desc';

  connection.runQuery(res, sql);
};

exports.purchaseOrderPerProject = function(req, res, next) {
  var sql = 'SELECT T0."Project",T0."DocDate",T2."SlpName",T1."CardName",T0."Dscription",T0."Quantity",T0."Price",T0."LineTotal" FROM POR1 T0 JOIN OPOR T1 ON T1."DocEntry" = T0."DocEntry" JOIN ODLN d1 on d1."DocEntry" = T0."DocEntry" JOIN OSLP T2 ON T2."SlpCode" = T1."SlpCode" where T0."Project" is not null and T0."Project" != ' + "'" + '' + "'" + 'and T0."ItemCode" is not null order by T0."DocDate" desc';

  connection.runQuery(res, sql);
};

exports.listingPenawaran = function(req, res, next) {
  var sql = 'SELECT * from DM_WO';

  connection.runQuery(res, sql);
};

exports.monthlyIncome = function(req, res, next) {
  var sql = 'Select MONTHNAME("DocDate") as "Month", sum("DocTotal" * "DocRate") as "Income" from oinv where "DocDate" <= now() and left("DocDate", 4) = 2020 and CANCELED =' + "'" + 'N' + "'" + ' and "DocStatus" = ' + "'" + 'C' + "'" + ' group by MONTHNAME("DocDate"), MONTH("DocDate")Order By  MONTH("DocDate")';
  //var sql = 'SELECT MONTHNAME(T0."RefDate") as "Month",sum(T0."Credit") as "Income" from JDT1 T0 Left JOIN OACT T1 ON T1."AcctCode"= T0."ShortName" where T0."TransType"=24 AND T0."Credit" > 0 and left(T0."RefDate", 4) = 2020 group by MONTHNAME(T0."RefDate"), MONTH(T0."RefDate") Order By  MONTH(T0."RefDate")';

  connection.runQuery(res, sql);
};

exports.monthlyOutcome = function(req, res, next) {
  var sql = 'Select MONTHNAME("DocDate") as "Month", sum("DocTotal" * "DocRate") as "Outcome" from opch where "DocDate" <= now() and left("DocDate", 4) = 2020 and CANCELED =' + "'" + 'N' + "'" + ' and "DocStatus" = ' + "'" + 'C' + "'" + ' group by MONTHNAME("DocDate"), MONTH("DocDate")Order By  MONTH("DocDate")';
  //var sql = 'SELECT MONTHNAME(T0."RefDate") as "Month",sum(T0."Debit") as "Outcome" from JDT1 T0 Left JOIN OACT T1 ON T1."AcctCode"= T0."ShortName" where T0."TransType"=46 AND T0."Debit" > 0 and left(T0."RefDate", 4) = 2020 group by MONTHNAME(T0."RefDate"), MONTH(T0."RefDate") Order By  MONTH(T0."RefDate")';

  connection.runQuery(res, sql);
};

exports.potentialMonthlyIncome = function(req, res, next) {
  var sql = 'Select MONTHNAME("DocDueDate") as "Month", sum("DocTotal" * "DocRate") as "pIncome" from oinv where "DocDueDate" >= now() and CANCELED =' + "'" + 'N' + "'" + ' and "DocStatus" = ' + "'" + 'O' + "'" + ' group by MONTHNAME("DocDueDate"), MONTH("DocDueDate")Order By  MONTH("DocDueDate")';

  connection.runQuery(res, sql);
};

exports.potentialMonthlyOutcome = function(req, res, next) {
  var sql = 'Select MONTHNAME("DocDueDate") as "Month", sum("DocTotal" * "DocRate") as "pOutcome" from opch where "DocDueDate" >= now() and CANCELED =' + "'" + 'N' + "'" + ' and "DocStatus" = ' + "'" + 'O' + "'" + ' group by MONTHNAME("DocDueDate"), MONTH("DocDueDate")Order By  MONTH("DocDueDate")';

  connection.runQuery(res, sql);
};