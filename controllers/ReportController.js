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
  // var sql = 'select sq."DocNum" as "docnum", sq."CardName" as "Customer", sc."ItemBrand" as "Brand", ct."CntrcTmplt" as "ContractType", ct."ContractID" as "ContractID", left(ct."EndDate", 10) as "ContractEndDate", sc."ItemType" as "Type", sc."ItemCapacity" as "Capacity", sc."ItemMeasurement" as "Measurement", sc."ItemLocation" as Location,sc."ItemCode",left(sc."DocDate", 10) as "EntryDate",left(sq."DocDate", 10)  as "LeaveDate",sc."WODate" as WO_DATE, left(so."DocDate", 10)  as PO_DATE, left(so."DocDueDate", 10)  as SO_DATE, ddo."DocNum" as DO_DOCNUM, left(ddo."DocDate", 10)  as DO_DATE,inv."DocNum" as INV_DOCNUM,	 sc."Reason" as REJECT_REASON,	 sc."ItemName" as Item, sc."DocSubject" as "Subject",	 sc."ItemSN" as Serial,	 sc."SeriesName" as Series,	 sc."callID" as SC_CallID,	 sc."DocNum" as SC_DocNum,	 sc."ContractID" as Contract,	 sq."DocEntry" as SQ_DocEntry,	 sq."DocNum" as SQ_DOCNUM ,	 left(sq."DocDate", 10) as SQ_DATE, hr."lastName", hr."firstName", hr."middleName" from oqut sq full join scl4 sc4 on sc4."DocAbs" = sq."DocEntry" full join FH_OSCL sc on sc."callID" = sc4."SrcvCallID" left join ordr so on so."DocEntry" = sq."DocEntry" full join octr ct on ct."ContractID" = sc."ContractID" left join odln ddo on ddo."DocEntry" = sq."DocEntry" left join oinv inv on inv."DocEntry" = sq."DocEntry" join ohem hr on hr."empID" = sq."OwnerCode" where sq."OwnerCode" IN (609,579) and sq."DocStatus" = ' + "'" + 'O' + "'";

  var sql = 'select oqut."DocNum" as "docnum", sq."DocTotal", oqut."CardName" as "Customer", sc."ItemBrand" as "Brand", octr."CntrcTmplt" as "ContractType", octr."ContractID" as "ContractID", left(octr."EndDate", 10) as "ContractEndDate", sc."ItemType" as "Type", sc."ItemCapacity" as "Capacity", sc."ItemMeasurement" as "Measurement", sc."ItemLocation" as Location,sc."ItemCode",left(sc."DocDate", 10) as "EntryDate",left(oqut."DocDate", 10)  as "LeaveDate",sc."WODate" as WO_DATE, left(ordr."DocDate", 10)  as PO_DATE,sc."DocStatus" as SC_Status, left(ordr."DocDueDate", 10)  as SO_DATE, odln."DocNum" as DO_DOCNUM, left(odln."DocDate", 10)  as DO_DATE,oinv."DocNum" as INV_DOCNUM,	 sc."Reason" as REJECT_REASON,	 sc."ItemName" as Item, sc."DocSubject" as "Subject",	 sc."ItemSN" as Serial,	 sc."SeriesName" as Series,	 sc."callID" as SC_CallID,	 sc."DocNum" as SC_DocNum,	 sc."ContractID" as Contract,	 oqut."DocEntry" as SQ_DocEntry,	 oqut."DocNum" as SQ_DOCNUM ,	 left(oqut."DocDate", 10) as SQ_DATE, hr."lastName", hr."firstName", hr."middleName" from oqut oqut  full join scl4 scl4 on scl4."DocAbs" = oqut."DocEntry" full join FH_OSCL sc on sc."callID" = scl4."SrcvCallID"  LEFT Join QUT1 qut1 On oqut."DocEntry"=qut1."DocEntry"LEFT JOIN RDR1 rdr1 ON qut1."DocEntry" = rdr1."BaseEntry" and qut1."LineNum"=rdr1."BaseLine" LEFT Join DLN1 dln1 On rdr1."DocEntry"=dln1."BaseEntry" and rdr1."LineNum"=dln1."BaseLine"  LEFT Join ODLN odln On dln1."DocEntry"=odln."DocEntry" LEFT Join INV1 inv1 On dln1."DocEntry"=inv1."BaseEntry" and dln1."LineNum"=inv1."BaseLine"  LEFT Join OINV oinv On inv1."DocEntry"=oinv."DocEntry"left join ordr ordr on ordr."DocEntry" = rdr1."DocEntry" full join octr octr on octr."ContractID" = sc."ContractID" join ohem hr on hr."empID" = oqut."OwnerCode" where oqut."OwnerCode" IN (609,579)';

  connection.runQuery(res, sql);
};

exports.maintenanceBackLog = function(req, res, next) {
  var sql = 'select null as "docnum", null as "DocTotal", sc."CardName" as "Customer", sc."ItemBrand" as "Brand", ct."CntrcTmplt" as "ContractType", ct."ContractID" as "ContractID", left(ct."EndDate", 10) as "ContractEndDate", sc."ItemType" as "Type", sc."ItemCapacity" as "Capacity", sc."ItemMeasurement" as "Measurement", sc."ItemLocation" as Location,sc."ItemCode",left(sc."DocDate", 10) as "EntryDate", null as "LeaveDate",sc."WODate" as WO_DATE, null as PO_DATE, null as SO_DATE, null as DO_DOCNUM, null as DO_DATE, null as INV_DOCNUM,	 sc."DocStatus" as SC_Status, sc."Reason" as REJECT_REASON, sc."ItemName" as Item, sc."DocSubject" as "Subject",	sc."ItemSN" as Serial,	sc."SeriesName" as Series,	sc."callID" as SC_CallID,	sc."DocNum" as SC_DocNum,	sc."ContractID" as Contract, null as SQ_DocEntry,	null as SQ_DOCNUM ,	null as SQ_DATE, null as "lastName", null as "firstName", null as "middleName" from FH_OSCL sc full join scl4 sc4 on sc."callID" = sc4."SrcvCallID" full join octr ct on ct."ContractID" = sc."ContractID" where sc."Remark" like ' + "'%" + 'Warranty Deltasindo' + "%'" + ' order by sc."callID" asc';

  connection.runQuery(res, sql);
};

exports.maintenanceNextBackLog = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select distinct scl4."SrcvCallID" as "SC_CALLID", left(oqut."DocDate", 10) as "Workshop End Date", left(odln."DocDate", 10) as "Repair End Date" from scl4 scl4 join oqut oqut on oqut."DocNum" = scl4."DocNumber" and scl4."Object" = 23 left join qut1 qut1 on qut1."DocEntry" = oqut."DocEntry" left join rdr1 rdr1 on rdr1."BaseEntry" = qut1."DocEntry" left join dln1 dln1 on dln1."BaseEntry" = rdr1."DocEntry" left join odln odln on dln1."DocEntry" = odln."DocEntry" where scl4."SrcvCallID" in (' + req.query.sc + ') and (qut1."ItemCode" != null or qut1."ItemCode" != ' + "'" + '' + "'" + ') order by scl4."SrcvCallID" asc';

  connection.runQuery(res, sql);
};

exports.maintenanceNextServiceBackLog = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select distinct scl4."SrcvCallID" as "SC_CALLID", left(ordr."DocDate", 10) as "PO_DATE", left(odln."DocDate", 10) as "DO_DATE" from scl4 scl4 join ordr ordr on ordr."DocNum" = scl4."DocNumber" and scl4."Object" = 17 left join rdr1 rdr1 on rdr1."DocEntry" = ordr."DocEntry" left join dln1 dln1 on dln1."BaseEntry" = rdr1."DocEntry" left join odln odln on dln1."DocEntry" = odln."DocEntry" where scl4."SrcvCallID" in (' + req.query.sc + ') and (ordr."DocType" = ' + "'" + 'S' + "'" + ') order by scl4."SrcvCallID" asc';

  connection.runQuery(res, sql);
};

exports.inhsBackLog = function(req, res, next) {
  var sql = 'select sq."DocNum" as "docnum",  sq."DocTotal" as "DocTotal", sq."CardName" as "Customer", sc."ItemBrand" as "Brand", ct."CntrcTmplt" as "ContractType", ct."ContractID" as "ContractID", left(ct."EndDate", 10) as "ContractEndDate", sc."ItemType" as "Type", sc."ItemCapacity" as "Capacity", sc."ItemMeasurement" as "Measurement", sc."ItemLocation" as Location,sc."ItemCode",left(sc."DocDate", 10) as "EntryDate",left(sq."DocDate", 10)  as "LeaveDate",sc."WODate" as WO_DATE, left(so."DocDate", 10)  as PO_DATE, left(so."DocDueDate", 10)  as SO_DATE, sc."DocStatus" as SC_Status, ddo."DocNum" as DO_DOCNUM, left(ddo."DocDate", 10)  as DO_DATE,inv."DocNum" as INV_DOCNUM,	 sc."Reason" as REJECT_REASON,	 sc."ItemName" as Item, sc."DocSubject" as "Subject",	 sc."ItemSN" as Serial,	 sc."SeriesName" as Series,	 sc."callID" as SC_CallID,	 sc."DocNum" as SC_DocNum,	 sc."ContractID" as Contract,	 sq."DocEntry" as SQ_DocEntry,	 sq."DocNum" as SQ_DOCNUM ,	 left(sq."DocDate", 10) as SQ_DATE, hr."lastName", hr."firstName", hr."middleName" from oqut sq full join scl4 sc4 on sc4."DocAbs" = sq."DocEntry" full join FH_OSCL sc on sc."callID" = sc4."SrcvCallID" left join ordr so on so."DocEntry" = sq."DocEntry" full join octr ct on ct."ContractID" = sc."ContractID" left join odln ddo on ddo."DocEntry" = sq."DocEntry" left join oinv inv on inv."DocEntry" = sq."DocEntry" join ohem hr on hr."empID" = sq."OwnerCode" where sq."OwnerCode" IN (609,579) and (SUBSTR("SeriesName", 3, 4)) =  ' + "'" + 'INHS' + "'" + ' order by sc."callID" asc';

  connection.runQuery(res, sql);
};

exports.inhsNextBackLog = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select distinct scl4."SrcvCallID" as "SC_CALLID", left(oqut."DocDate", 10) as "Workshop End Date", left(odln."DocDate", 10) as "Repair End Date" from scl4 scl4 join oqut oqut on oqut."DocNum" = scl4."DocNumber" and scl4."Object" = 23 left join qut1 qut1 on qut1."DocEntry" = oqut."DocEntry" left join rdr1 rdr1 on rdr1."BaseEntry" = qut1."DocEntry" left join dln1 dln1 on dln1."BaseEntry" = rdr1."DocEntry" left join odln odln on dln1."DocEntry" = odln."DocEntry" where scl4."SrcvCallID" in (' + req.body.sc + ') and (qut1."ItemCode" != null or qut1."ItemCode" != ' + "'" + '' + "'" + ') order by scl4."SrcvCallID" asc';

  connection.runQuery(res, sql);
};

exports.contBackLog = function(req, res, next) {
  var sql = 'select sq."DocNum" as "docnum", sq."CardName" as "Customer", sc."ItemBrand" as "Brand", ct."CntrcTmplt" as "ContractType", ct."ContractID" as "ContractID", left(ct."EndDate", 10) as "ContractEndDate", sc."ItemType" as "Type", sc."ItemCapacity" as "Capacity", sc."ItemMeasurement" as "Measurement", sc."ItemLocation" as Location,sc."ItemCode",left(sc."DocDate", 10) as "EntryDate",left(sq."DocDate", 10)  as "LeaveDate",sc."WODate" as WO_DATE, left(so."DocDate", 10)  as PO_DATE, left(so."DocDueDate", 10)  as SO_DATE, sc."DocStatus" as SC_Status, ddo."DocNum" as DO_DOCNUM, left(ddo."DocDate", 10)  as DO_DATE,inv."DocNum" as INV_DOCNUM,	 sc."Reason" as REJECT_REASON,	 sc."ItemName" as Item, sc."DocSubject" as "Subject",	 sc."ItemSN" as Serial,	 sc."SeriesName" as Series,	 sc."callID" as SC_CallID,	 sc."DocNum" as SC_DocNum,	 sc."ContractID" as Contract,	 sq."DocEntry" as SQ_DocEntry,	 sq."DocNum" as SQ_DOCNUM ,	 left(sq."DocDate", 10) as SQ_DATE, hr."lastName", hr."firstName", hr."middleName" from oqut sq full join scl4 sc4 on sc4."DocAbs" = sq."DocEntry" full join FH_OSCL sc on sc."callID" = sc4."SrcvCallID" left join ordr so on so."DocEntry" = sq."DocEntry" full join octr ct on ct."ContractID" = sc."ContractID" left join odln ddo on ddo."DocEntry" = sq."DocEntry" left join oinv inv on inv."DocEntry" = sq."DocEntry" join ohem hr on hr."empID" = sq."OwnerCode" where sq."OwnerCode" IN (609,579) and (SUBSTR("SeriesName", 3, 4)) =  ' + "'" + 'CONT' + "'";

  connection.runQuery(res, sql);
};

exports.onstBackLog = function(req, res, next) {
  var sql = 'select sq."DocNum" as "docnum", sq."CardName" as "Customer", sc."ItemBrand" as "Brand", ct."CntrcTmplt" as "ContractType", ct."ContractID" as "ContractID", left(ct."EndDate", 10) as "ContractEndDate", sc."ItemType" as "Type", sc."ItemCapacity" as "Capacity", sc."ItemMeasurement" as "Measurement", sc."ItemLocation" as Location,sc."ItemCode",left(sc."DocDate", 10) as "EntryDate",left(sq."DocDate", 10)  as "LeaveDate",sc."WODate" as WO_DATE, left(so."DocDate", 10)  as PO_DATE, left(so."DocDueDate", 10)  as SO_DATE, sc."DocStatus" as SC_Status, ddo."DocNum" as DO_DOCNUM, left(ddo."DocDate", 10)  as DO_DATE,inv."DocNum" as INV_DOCNUM,	 sc."Reason" as REJECT_REASON,	 sc."ItemName" as Item, sc."DocSubject" as "Subject",	 sc."ItemSN" as Serial,	 sc."SeriesName" as Series,	 sc."callID" as SC_CallID,	 sc."DocNum" as SC_DocNum,	 sc."ContractID" as Contract,	 sq."DocEntry" as SQ_DocEntry,	 sq."DocNum" as SQ_DOCNUM ,	 left(sq."DocDate", 10) as SQ_DATE, hr."lastName", hr."firstName", hr."middleName" from oqut sq full join scl4 sc4 on sc4."DocAbs" = sq."DocEntry" full join FH_OSCL sc on sc."callID" = sc4."SrcvCallID" left join ordr so on so."DocEntry" = sq."DocEntry" full join octr ct on ct."ContractID" = sc."ContractID" left join odln ddo on ddo."DocEntry" = sq."DocEntry" left join oinv inv on inv."DocEntry" = sq."DocEntry" join ohem hr on hr."empID" = sq."OwnerCode" where sq."OwnerCode" IN (609,579) and (SUBSTR("SeriesName", 3, 4)) =  ' + "'" + 'ONST' + "'";

  connection.runQuery(res, sql);
};

exports.onclBackLog = function(req, res, next) {
  var sql = 'select sq."DocNum" as "docnum", sq."CardName" as "Customer", sc."ItemBrand" as "Brand", ct."CntrcTmplt" as "ContractType", ct."ContractID" as "ContractID", left(ct."EndDate", 10) as "ContractEndDate", sc."ItemType" as "Type", sc."ItemCapacity" as "Capacity", sc."ItemMeasurement" as "Measurement", sc."ItemLocation" as Location,sc."ItemCode",left(sc."DocDate", 10) as "EntryDate",left(sq."DocDate", 10)  as "LeaveDate",sc."WODate" as WO_DATE, left(so."DocDate", 10)  as PO_DATE, left(so."DocDueDate", 10)  as SO_DATE, sc."DocStatus" as SC_Status, ddo."DocNum" as DO_DOCNUM, left(ddo."DocDate", 10)  as DO_DATE,inv."DocNum" as INV_DOCNUM,	 sc."Reason" as REJECT_REASON,	 sc."ItemName" as Item, sc."DocSubject" as "Subject",	 sc."ItemSN" as Serial,	 sc."SeriesName" as Series,	 sc."callID" as SC_CallID,	 sc."DocNum" as SC_DocNum,	 sc."ContractID" as Contract,	 sq."DocEntry" as SQ_DocEntry,	 sq."DocNum" as SQ_DOCNUM ,	 left(sq."DocDate", 10) as SQ_DATE, hr."lastName", hr."firstName", hr."middleName" from oqut sq full join scl4 sc4 on sc4."DocAbs" = sq."DocEntry" full join FH_OSCL sc on sc."callID" = sc4."SrcvCallID" left join ordr so on so."DocEntry" = sq."DocEntry" full join octr ct on ct."ContractID" = sc."ContractID" left join odln ddo on ddo."DocEntry" = sq."DocEntry" left join oinv inv on inv."DocEntry" = sq."DocEntry" join ohem hr on hr."empID" = sq."OwnerCode" where sq."OwnerCode" IN (609,579) and (SUBSTR("SeriesName", 3, 4)) =  ' + "'" + 'ONCL' + "'";

  connection.runQuery(res, sql);
};

exports.otherBackLog = function(req, res, next) {
  var sql = 'select sq."DocNum" as "docnum", sq."CardName" as "Customer", sc."ItemBrand" as "Brand", ct."CntrcTmplt" as "ContractType", ct."ContractID" as "ContractID", left(ct."EndDate", 10) as "ContractEndDate", sc."ItemType" as "Type", sc."ItemCapacity" as "Capacity", sc."ItemMeasurement" as "Measurement", sc."ItemLocation" as Location,sc."ItemCode",left(sc."DocDate", 10) as "EntryDate",left(sq."DocDate", 10)  as "LeaveDate",sc."WODate" as WO_DATE, left(so."DocDate", 10)  as PO_DATE, left(so."DocDueDate", 10)  as SO_DATE, sc."DocStatus" as SC_Status, ddo."DocNum" as DO_DOCNUM, left(ddo."DocDate", 10)  as DO_DATE,inv."DocNum" as INV_DOCNUM,	 sc."Reason" as REJECT_REASON,	 sc."ItemName" as Item, sc."DocSubject" as "Subject",	 sc."ItemSN" as Serial,	 sc."SeriesName" as Series,	 sc."callID" as SC_CallID,	 sc."DocNum" as SC_DocNum,	 sc."ContractID" as Contract,	 sq."DocEntry" as SQ_DocEntry,	 sq."DocNum" as SQ_DOCNUM ,	 left(sq."DocDate", 10) as SQ_DATE, hr."lastName", hr."firstName", hr."middleName" from oqut sq full join scl4 sc4 on sc4."DocAbs" = sq."DocEntry" full join FH_OSCL sc on sc."callID" = sc4."SrcvCallID" left join ordr so on so."DocEntry" = sq."DocEntry" full join octr ct on ct."ContractID" = sc."ContractID" left join odln ddo on ddo."DocEntry" = sq."DocEntry" left join oinv inv on inv."DocEntry" = sq."DocEntry" join ohem hr on hr."empID" = sq."OwnerCode" where sq."OwnerCode" IN (609,579) and sc."SeriesName" =  null';

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
  var sql = 'SELECT T0."Project",T0."DocDate",T2."SlpName",T1."CardName",T0."Dscription",T0."Quantity",T0."Price",T0."LineTotal",d1."U_VIT_NPAN", d1."DocNum" FROM RDR1 T0 JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry" left JOIN ODLN d1 on d1."DocEntry" = T0."DocEntry" left JOIN OSLP T2 ON T2."SlpCode" = T1."SlpCode" where T0."Project" is not null and T0."Project" != ' + "'" + '' + "'" + 'and T0."ItemCode" is not null order by T0."DocDate" desc';

  connection.runQuery(res, sql);
};

exports.purchaseOrderPerProject = function(req, res, next) {
  var sql = 'SELECT T0."Project",T0."DocDate",T2."SlpName",T1."CardName",T0."Dscription",T0."Quantity",T0."Price",T0."LineTotal" FROM POR1 T0 JOIN OPOR T1 ON T1."DocEntry" = T0."DocEntry" left JOIN ODLN d1 on d1."DocEntry" = T0."DocEntry" left JOIN OSLP T2 ON T2."SlpCode" = T1."SlpCode" where T0."Project" is not null and T0."Project" != ' + "'" + '' + "'" + 'and T0."ItemCode" is not null order by T0."DocDate" desc';

  connection.runQuery(res, sql);
};

exports.listingPenawaran = function(req, res, next) {
  var sql = 'SELECT * from DM_WO';

  connection.runQuery(res, sql);
};

exports.monthlyIncome = function(req, res, next) {
  //var sql = 'Select MONTHNAME("DocDate") as "Month", sum("DocTotal" * "DocRate") as "Income" from oinv where "DocDate" <= now() and left("DocDate", 4) = 2020 and CANCELED =' + "'" + 'N' + "'" + ' and "DocStatus" = ' + "'" + 'C' + "'" + ' group by MONTHNAME("DocDate"), MONTH("DocDate")Order By  MONTH("DocDate")';
  var sql = 'SELECT MONTHNAME(T0."RefDate") as "Month",sum(T0."Credit") as "Income" from JDT1 T0 Left JOIN OACT T1 ON T1."AcctCode"= T0."ShortName" where T0."TransType"=24 AND T0."Credit" > 0 and left(T0."RefDate", 4) = 2020 group by MONTHNAME(T0."RefDate"), MONTH(T0."RefDate") Order By  MONTH(T0."RefDate")';

  connection.runQuery(res, sql);
};

exports.monthlyOutcome = function(req, res, next) {
  //var sql = 'Select MONTHNAME("DocDate") as "Month", sum("DocTotal" * "DocRate") as "Outcome" from opch where "DocDate" <= now() and left("DocDate", 4) = 2020 and CANCELED =' + "'" + 'N' + "'" + ' and "DocStatus" = ' + "'" + 'C' + "'" + ' group by MONTHNAME("DocDate"), MONTH("DocDate")Order By  MONTH("DocDate")';
  var sql = 'SELECT MONTHNAME(T0."RefDate") as "Month",sum(T0."Debit") as "Outcome" from JDT1 T0 Left JOIN OACT T1 ON T1."AcctCode"= T0."ShortName" where T0."TransType"=46 AND T0."Debit" > 0 and left(T0."RefDate", 4) = 2020 group by MONTHNAME(T0."RefDate"), MONTH(T0."RefDate") Order By  MONTH(T0."RefDate")';

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

exports.pdcaProject = function(req, res, next) {
  var sql = 'select * from oprj where left("PrjCode", 2) in (' + req.query.year + ') or SUBSTRING("U_StartDate", 3, 2) in  (' + req.query.year + ')';

  connection.runQuery(res, sql);
};

exports.outstandingBigSales = function(req, res, next) {
  var sql = 'select * from DM_OUTSTANDING_BIG_SALES';

  connection.runQuery(res, sql);
};

exports.pdcaSales = function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  // var sql = 'SELECT distinct T10."DocNum" "Quot. No.", ordr."DocEntry", ordr."DocNum" As "SO No.", left(T10."DocDate", 10) as "DocDate", left(T10."DocDueDate", 10) as "DocDueDate", dpi1."DocEntry" as "DownPayment No.", ordr."CardCode", ordr."CardName", ordr."NumAtCard", octg."PymntGroup" "Payment terms", odln."DocNum" As "DLN No.", left(odln."DocDate", 10) as "ShipDate", oinv."DocNum" "Inv. No.", oinv."DocTotal" "Inv. Total", T10."DocTotal" "SQ Total", ohem."lastName", ohem."firstName", ohem."middleName" FROM ORDR  ordr INNER JOIN RDR1 rdr1 ON ordr."DocEntry" = rdr1."DocEntry" LEFT Join DLN1 dln1 On rdr1."DocEntry"=dln1."BaseEntry" and rdr1."LineNum"=dln1."BaseLine"  LEFT Join ODLN odln On dln1."DocEntry"=odln."DocEntry" Left Join OCTG octg On ordr."GroupNum" = octg."GroupNum" LEFT JOIN DPI1 dpi1 On dpi1."BaseEntry"=ordr."DocEntry" LEFT JOIN ODPI odpi On dpi1."DocEntry"=odpi."DocEntry" LEFT Join INV1 inv1 On dln1."DocEntry"=inv1."BaseEntry" and dln1."LineNum"=inv1."BaseLine"  LEFT Join OINV oinv On inv1."DocEntry"=oinv."DocEntry" LEFT Join QUT1 qut1 On rdr1."DocEntry"=qut1."TrgetEntry" and qut1."LineNum"=rdr1."BaseLine"  LEFT Join OQUT T10 On qut1."DocEntry"=T10."DocEntry" join ohem ohem on T10."OwnerCode" =  ohem."empID" Where oinv."DocStatus"=' + "'" + 'C' + "'" + ' and left(T10."DocDate", 4)  in  (' + req.query.year + ') Group By ordr."DocNum", T10."DocDate", T10."DocDueDate", ordr."CardCode", ordr."CardName", ordr."NumAtCard", rdr1."ItemCode", rdr1."Dscription", rdr1."Quantity", rdr1."OpenQty", odln."DocNum", dln1."Quantity", rdr1."Price", octg."PymntGroup", rdr1."FreeTxt", ordr."DocEntry", odln."DocDate", dpi1."DocEntry", oinv."DocNum", oinv."DocTotal", T10."DocTotal", T10."DocNum", ohem."lastName", ohem."firstName", ohem."middleName" Order By ordr."DocEntry"';

  var sql = 'SELECT distinct T10."DocNum" "Quot. No.", ordr."DocEntry", ordr."DocNum" As "SO No.", left(T10."DocDate", 10) as "DocDate", left(T10."DocDueDate", 10) as "DocDueDate", dpi1."DocEntry" as "DownPayment No.", t10."CardCode", t10."CardName", coalesce (oinv."DiscPrcnt", ordr."DiscPrcnt", T10."DiscPrcnt") as "DiscPrcnt", ordr."NumAtCard", case when T10."DocType" =' + "'" + 'I' + "'" + ' then coalesce(rdr1."ItemCode", qut1."ItemCode") else coalesce (rdr1."Dscription" ,qut1."Dscription") end as "ItemCode", coalesce(rdr1."Dscription", qut1."Dscription") as "Dscription", case when T10."DocType" =' + "'" + 'I' + "'" + ' then coalesce (inv1."Quantity", rdr1."Quantity", qut1."Quantity") else coalesce (inv1.U_VIT_QT, rdr1.U_VIT_QT, qut1.U_VIT_QT) end as "Quantity", case when t10."DocType" =' + "'" + 'I' + "'" + ' then coalesce (inv1."Price", rdr1."Price", qut1."Price") else coalesce (inv1.U_VIT_UP, rdr1.U_VIT_UP, qut1.U_VIT_UP) end as "Item Price", case when oinv."DocStatus" =' + "'" + 'C' + "'" + ' then 1 else 0 end as "Paid", case when oinv."DocStatus" is not null then 1 else 0 end as "INV Doc", case when ordr."DocStatus" =' + "'" + 'C' + "'" + ' then 1 else 0 end as "SO Doc", case when odln."DocStatus" =' + "'" + 'C' + "'" + ' then 1 else 0 end as "DO Doc", octg."PymntGroup" "Payment terms", odln."DocNum" As "DLN No.", case when odln."DocType" =' + "'" + 'I' + "'" + ' then dln1."Quantity" else dln1."U_VIT_QT" end As "Total Rcvd", rdr1."OpenQty", left(rdr1."ShipDate", 10) as "ShipDate", rdr1."LineNum", oinv."DocNum" "Inv. No.", oinv."DocTotal" "Inv. Total", T10."DocTotal" "SQ Total", ohem."lastName", ohem."firstName", ohem."middleName" FROM oqut T10 INNER JOIN qut1 qut1 ON T10."DocEntry" = qut1."DocEntry" LEFT Join rdr1 rdr1 On (rdr1."DocEntry"=qut1."TrgetEntry" or rdr1."BaseEntry"=qut1."DocEntry") and qut1."LineNum"=rdr1."BaseLine" LEFT Join ORDR ordr On rdr1."DocEntry"=ordr."DocEntry" and ordr.CANCELED =' + "'" + 'N' + "'" + ' LEFT Join DLN1 dln1 On (rdr1."TrgetEntry"=dln1."DocEntry" or rdr1."DocEntry"=dln1."BaseEntry") and rdr1."LineNum"=dln1."BaseLine" LEFT Join ODLN odln On dln1."DocEntry"=odln."DocEntry" and ordr."NumAtCard" = odln."NumAtCard" and odln."CANCELED" != ' + "'" + 'Y' + "'" + ' Left Join OCTG octg On ordr."GroupNum" = octg."GroupNum" LEFT JOIN DPI1 dpi1 On dpi1."BaseEntry"=ordr."DocEntry" LEFT JOIN ODPI odpi On dpi1."DocEntry"=odpi."DocEntry" LEFT Join INV1 inv1 On (dln1."TrgetEntry"=inv1."DocEntry" or dln1."DocEntry"=inv1."BaseEntry") and dln1."LineNum"=inv1."BaseLine"  LEFT Join OINV oinv On inv1."DocEntry"=oinv."DocEntry" and ordr."NumAtCard" = oinv."NumAtCard" and oinv."CANCELED" =' + "'" + 'N' + "'" + ' join ohem ohem on T10."OwnerCode" =  ohem."empID" Where left(ordr."DocDate", 4) in  (' + req.query.year + ') Group By ordr."DocNum", T10."DocDate", T10."DocDueDate", t10."CardCode", t10."CardName", ordr."NumAtCard", qut1."ItemCode", qut1."Dscription", rdr1."Dscription", rdr1."ItemCode", rdr1."U_VIT_QT", rdr1."Quantity", rdr1."U_VIT_UP", rdr1."Price", qut1."Quantity", rdr1."OpenQty", odln."DocNum", dln1."Quantity", qut1."Price", octg."PymntGroup", rdr1."FreeTxt", ordr."DocEntry", odln."DocDate", dpi1."DocEntry", oinv."DocNum", oinv."DocTotal", T10."DocTotal", inv1.U_VIT_QT, inv1.U_VIT_UP, oinv."DiscPrcnt", ordr."DiscPrcnt", inv1."Price", inv1."Quantity", T10."DocNum", ohem."lastName", ohem."firstName", ohem."middleName", t10."DocType", T10."DiscPrcnt", qut1.U_VIT_QT, qut1.U_VIT_UP, DLN1.U_VIT_QT, oinv."DocStatus", ODLN."DocType", rdr1."ShipDate", rdr1."LineNum", ORDR."DocStatus", odln."DocStatus" Order By ordr."DocEntry"';

  connection.runQuery(res, sql);
};

exports.documentReport = function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var year = req.query.Year || '';
  var owner = req.query.OwnerCode || '';
  var doctype = req.query.DocType || 'oqut';

  var sql = 'select distinct concat(hr."lastName" , hr."firstName") "name",doc."OwnerCode" as "owner_code",sum(CASE WHEN doc."DocStatus" = ' + "'" + 'O' + "'" + ' then doc."DocTotal" end) as "outstanding_total",sum(CASE WHEN doc."CANCELED" = ' + "'" + 'Y' + "'" + ' then doc."DocTotal" end) as "canceled_total",sum(CASE WHEN doc."DocStatus" = ' + "'" + 'C' + "'" + ' and doc."CANCELED" = ' + "'" + 'N' + "'" + ' then doc."DocTotal" end) as "closed_total",sum(doc."DocTotal") as "total" FROM ' + doctype + ' doc join ohem hr on hr."empID" = doc."OwnerCode" where doc."OwnerCode" like ' + "'" + '%'+owner + "'" + ' and left(doc."DocDate", 4) like ' + "'" + '%'+year + "'" + ' group by doc."OwnerCode", hr."lastName", hr."firstName", hr."middleName"'

  connection.runQuery(res, sql);
}

exports.purchaseOrderInternalReport = function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var startDatePO = req.query.startDatePO || '';
  var endDatePO = req.query.endDatePO || '';
  var startDateGRPO = req.query.startDateGRPO || '';
  var endDateGRPO = req.query.endDateGRPO || '';

  var sql = 'select opor."DocNum" as "PO Num", opor."DocDate" as "PO Date", opor."CardName" as "Supplier", por1."ItemCode" as "Item Code", por1."Dscription" as "Item Description", por1."Currency" as "Item Currency",por1."Price" as "Item Price", por1."Quantity" as "Item Quantity", opdn."DocNum" as "GRPO DocNum",opdn."DocDate" as "GRPO Date",por1."WhsCode" as "Received Warehouse Code",  opch."DocNum" as "Invoice Number" from opor join por1 on opor."DocEntry" = por1."DocEntry" left join pdn1 on opor."DocEntry" = pdn1."BaseEntry" and pdn1."BaseLine" = por1."LineNum"left join opdn on pdn1."DocEntry" = opdn."DocEntry"left join opch on pdn1."TrgetEntry" = opch."DocEntry"where opor."DocDate" BETWEEN '+ "'" + startDatePO + "'" +' and '+ "'" + endDatePO + "'" +' and opdn."DocDate" BETWEEN '+ "'" + startDateGRPO + "'" +' and '+ "'" + endDateGRPO + "'" +' order by opor."DocDate" desc'

  connection.runQuery(res, sql);
}

exports.serialNumberService = function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  // var sql  = 'select distinct sr."IntrSerial" as "Serial Number", sr."ItemCode", sr."ItemName", oslp."SlpName" as "Sales Person", sri1."CardName" || ' + "'" + ' (' + "'" + ' || sri1."CardCode" || ' + "'" + ') ' + "'" + ' as "Customer", sri1."BaseNum" as "DO Kirim SN", sri1."DocDate" as "Tanggal Kirim SN", odln."Address" || ' + "'" + ' - ' + "'" + ' || odln."Address2" as "Alamat Kirim", DAYS_BETWEEN(oscl."cntrctDate", NOW()) as "Berapa Hari setelah Kontrak Habis", oscl."cntrctDate" as "Tanggal Habis Kontrak", case when ocpr."Name" is null then (ocpr2."Name" || ' + "'" + ' (' + "'" + ' || coalesce(ocpr2."Tel1", ' + "'" + '' + "'" + ') || ' + "'" + ') ' + "'" + ' || ' + "'" + '- ' + "'" + ' || coalesce(ocpr2."E_MailL", ' + "'" + '' + "'" + ')) else (ocpr."Name" || ' + "'" + ' (' + "'" + ' || ocpr."Tel1" || ' + "'" + ') ' + "'" + ' || ' + "'" + '- ' + "'" + ' || ocpr."E_MailL") end as "Contact Person",dln1."ItemCode" || ' + "'" + ' ' + "'" + ' || dln1."Dscription" || ' + "'" + ' (' + "'" + ' || dln1."Quantity" || ' + "'" + ' ' + "'" + ' || dln1."unitMsr" || ' + "'" + ') ' + "'" + ' as "Item pendukung"from osri sr join sri1 sri1 on sr."SysSerial" = sri1."SysSerial" and sri1."BaseEntry" = (select distinct max("BaseEntry") from sri1 sri12 where sri12."SysSerial" = sr."SysSerial" and sri12."ItemCode" = sr."ItemCode" GROUP BY "SysSerial") and sr."ItemCode" = sri1."ItemCode" and sri1."BaseType" = 15 left join oscl oscl on oscl."contractID" = (select distinct max("contractID") from oscl where "internalSN" = sr."IntrSerial") and (oscl."cntrctDate" is null or DAYS_BETWEEN(oscl."cntrctDate", NOW()) >= 0) left join odln odln on odln."DocNum" = sri1."BaseNum" left join oslp oslp on oslp."SlpCode" = odln."SlpCode" left join octr octr on octr."ContractID" = oscl."contractID" left join ocpr ocpr on ocpr."CntctCode" = octr."CntctCode" left join ocpr ocpr2 on ocpr2."CardCode" = odln."CardCode" join dln1 dln1 on dln1."DocEntry" = odln."DocEntry" and dln1."ItemCode" != sr."ItemCode" where DAYS_BETWEEN(sri1."DocDate", NOW()) > 730 order by sri1."DocDate" desc limit 10000';

  var sql  = 'select distinct sr."IntrSerial" as "Serial Number", sr."ItemCode", sr."ItemName", oslp."SlpName" as "Sales Person", sri1."CardName" || ' + "'" + ' (' + "'" + ' || sri1."CardCode" || ' + "'" + ') ' + "'" + ' as "Customer", sri1."BaseNum" as "DO Kirim SN", sri1."DocDate" as "Tanggal Kirim SN", odln."Address" || ' + "'" + ' - ' + "'" + ' || odln."Address2" as "Alamat Kirim", DAYS_BETWEEN(oscl."cntrctDate", NOW()) as "Berapa Hari setelah Kontrak Habis", oscl."cntrctDate" as "Tanggal Habis Kontrak", coalesce(ocpr."Name", ocpr2."Name", ocpr3."Name") || ' + "'" + ' (' + "'" + ' || coalesce(ocpr."Tel1", ocpr2."Tel1", ocpr3."Tel1") || ' + "'" + ') ' + "'" + ' || ' + "'" + '- ' + "'" + ' || coalesce(ocpr."E_MailL", ocpr2."E_MailL", ocpr3."E_MailL") as "Contact Person",dln1."ItemCode" || ' + "'" + ' ' + "'" + ' || dln1."Dscription" || ' + "'" + ' (' + "'" + ' || dln1."Quantity" || ' + "'" + ' ' + "'" + ' || dln1."unitMsr" || ' + "'" + ') ' + "'" + ' as "Item pendukung"from osri sr join sri1 sri1 on sr."SysSerial" = sri1."SysSerial" and sri1."BaseEntry" = (select distinct max("BaseEntry") from sri1 sri12 where sri12."SysSerial" = sr."SysSerial" and sri12."ItemCode" = sr."ItemCode" GROUP BY "SysSerial") and sr."ItemCode" = sri1."ItemCode" and sri1."BaseType" = 15 left join oscl oscl on oscl."contractID" = (select distinct max("contractID") from oscl where "internalSN" = sr."IntrSerial") and (oscl."cntrctDate" is null or DAYS_BETWEEN(oscl."cntrctDate", NOW()) >= 0) left join odln odln on odln."DocNum" = sri1."BaseNum" left join oslp oslp on oslp."SlpCode" = odln."SlpCode" left join octr octr on octr."ContractID" = oscl."contractID" left join ocpr ocpr on ocpr."CntctCode" = octr."CntctCode" left join ocpr ocpr2 on ocpr2."CntctCode" = oscl."contctCode" left join ocpr ocpr3 on ocpr3."CntctCode" = odln."CntctCode" join dln1 dln1 on dln1."DocEntry" = odln."DocEntry" and dln1."ItemCode" != sr."ItemCode" where DAYS_BETWEEN(sri1."DocDate", NOW()) > 730 order by sri1."DocDate" desc';

  connection.runQuery(res, sql);
}
