'use strict';

var response = require('../config/res');
var connection = require('../config/database/conn');
var hdbext = require('@sap/hdbext');

// start function
exports.DeliveryGEdanPhilips = function(req, res, next) {
  var sql = 'Select   T0."DocNum" as "DocNum",   T0."CardName" as "Name",   T0."U_VIT_NPAN" as "address",   T1."ItemCode" as "ItemCode",   T1."Dscription" as "ItemName",   T1."Quantity" as "qty",   T2."DistNumber" as "SerialNum", T5."ItmsGrpNam",  T3."DocNum" as "InvoiceDoc",  SUBSTRING(T0."CreateDate", 1, 10) as "TanggalDO",  T0."U_VIT_WGSE" as "WarrantyService",  T0."U_VIT_WGBA" as "WarrantyBattery",Q6."DocNum" as "Nomor SC" from odln T0   left join dln1 T1 on T1."DocEntry" = T0."DocEntry"   left join oinv T3 on T0."DocEntry" = T3."DocEntry"   left outer join SRI1 I1 on T1."ItemCode" = I1."ItemCode"   and (    T1."DocEntry" = I1."BaseEntry"     and T1."ObjType" = I1."BaseType"  )   left outer join OSRN T2 on T2."ItemCode" = I1."ItemCode"   and I1."SysSerial" = T2."SysNumber"  left join oitm T4 on T1."ItemCode" = T4."ItemCode"   left join oitb T5 on T4."ItmsGrpCod" = T5."ItmsGrpCod"   left join scl4 Q5 on T0."DocEntry" = Q5."DocAbs"   left join oscl Q6 on Q5."SrcvCallID" = Q6."callID" or T2."DistNumber" = Q6."internalSN"  left join ocrd Q7 on T0."CardCode" = Q7."CardCode" left join nnm1 N1 on T0."Series" = N1."Series" where T0."CardCode" in ( ' + "'C00646'" + ',' + "'C00502'" + ',' + "'C0102828'" + ',' + "'C0102679'" + ') and T0."CANCELED" = ' + "'N'" + ' and SUBSTRING(T0."DocDate", 3,2) = ' + "'" + req.query.code + "'" + ' and T5."ItmsGrpNam" in (' + req.body.itmgrp + ') and N1."SeriesName" NOT LIKE ' + "'" + 'DOSW%' + "'" + ' and N1."SeriesName" NOT LIKE ' + "'" + 'DOSI%' + "'" + ' or Q7."GroupCode" = ' + "'" + '107' + "'" + ' and T0."CANCELED" = ' + "'N'" + ' and SUBSTRING(T0."DocDate", 3,2) = ' + "'" + req.query.code + "'" + ' and T5."ItmsGrpNam" in (' + req.body.itmgrp + ') and N1."SeriesName" NOT LIKE ' + "'" + 'DOSW%' + "'" + ' and N1."SeriesName" NOT LIKE ' + "'" + 'DOSI%' + "'" + '';

  connection.runQuery(res, sql);
};

exports.DeliveryGEdanPhilipsDetail = function(req, res, next) {
  var sql = 'Select T0."DocNum" as "DocNum",   T0."CardName" as "Name",   T0."U_VIT_NPAN" as "address",   T1."ItemCode" as "ItemCode",   T1."Dscription" as "ItemName",   T1."Quantity" as "qty",   T2."DistNumber" as "SerialNum",   T3."DocNum" as "InvoiceDoc",   SUBSTRING(T0."CreateDate", 1, 10) as "TanggalDO",   T0."U_VIT_WGSE" as "WarrantyService",   T0."U_VIT_WGBA" as "WarrantyBattery",   Q6."DocNum" as "Nomor SC" from   odln T0   left join dln1 T1 on T1."DocEntry" = T0."DocEntry"   left join oinv T3 on T0."DocEntry" = T3."DocEntry"   left outer join SRI1 I1 on T1."ItemCode" = I1."ItemCode"   and (    T1."DocEntry" = I1."BaseEntry"     and T1."ObjType" = I1."BaseType"  )   left outer join OSRN T2 on T2."ItemCode" = I1."ItemCode"   and I1."SysSerial" = T2."SysNumber"   left join oitm T4 on T1."ItemCode" = T4."ItemCode"   left join oitb T5 on T4."ItmsGrpCod" = T5."ItmsGrpCod"   left join scl4 Q5 on T0."DocEntry" = Q5."DocAbs"   left join oscl Q6 on Q5."SrcvCallID" = Q6."callID"   left join ocrd Q7 on T0."CardCode" = Q7."CardCode" where   T0."DocNum" = ' + "' " + req.query.code + " '" + '  and T5."ItmsGrpNam" in (' + "'EATON SINGLE PHASE'" + ',' + "'EATON THREE PHASE'" + ',' + "'CHANNEL SINGLE PHASE'" + ',' + "'CHANNEL THREE PHASE'" + ',' + "'BATTERY 12V'" + ',' + "'BATTERY 2V'" + ',' + "'BATTERY 6V'" + ')';

  connection.runQuery(res, sql);
};

exports.DeliveryRS = function(req, res, next) {
  var sql = 'SELECT   T4."DistNumber"from   ODLN T0   inner join DLN1 T1 on T0."DocEntry" = T1."DocEntry"   left outer join SRI1 I1 on T1."ItemCode" = I1."ItemCode"   and (    T1."DocEntry" = I1."BaseEntry"     and T1."ObjType" = I1."BaseType"  )   left outer join OSRN T4 on T4."ItemCode" = I1."ItemCode"   and I1."SysSerial" = T4."SysNumber"  left join oitm T6 on T1."ItemCode" = T6."ItemCode"   left join oitb T5 on T6."ItmsGrpCod" = T5."ItmsGrpCod" where  T0."DocNum" = ' + "'" + req.query.code + "'" + ' and T5."ItmsGrpNam" in (' + "'EATON SINGLE PHASE'" + ',' + "'EATON THREE PHASE'" + ')';

  connection.runQuery(res, sql);
};

exports.DeliveryRSContract = function(req, res, next) {
  var sql = 'select distinct  octr."ContractID",   octr."CstmrName", SUBSTRING(octr."StartDate", 1, 10) AS "StartDate",   SUBSTRING(octr."EndDate", 1, 10) as "EndDate",   SUBSTRING(octr."TermDate", 1, 10) as "TermDate",   octr."SrvcType",  oins."internalSN",  oins."instLction",  oins."itemName",  oins."itemCode",  ordr."Quantity"from   octr   left join ctr1 on octr."ContractID" = ctr1."ContractID"  left join oins on ctr1."InternalSN" = oins."internalSN"   left join ocrd Q7 on octr."CstmrCode" = Q7."CardCode" where Q7."GroupCode" = ' + "'" + '107' + "'" + ' ';

  connection.runQuery(res, sql);
};

exports.sqssdetail = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'select   T1."DocNum", T1."CardCode",T1."Series", T1."U_VIT_TOPY" as "top", SUBSTRING(T1."DocDueDate",1,10) as "DocDueDate",  T1."Address",  T3."Tel1",  T3."Tel2",  T3."E_MailL", T3."Name" as "pic", T5."ItemCode",   T5."Dscription", T5."Price",T1."DocType" ,T5."U_VIT_QT" as "typeSQTY",  T5."U_VIT_FT" as "ItmService", T1."U_VIT_WGBA" as "garansibat", T1."U_VIT_WGSA" as "garansisp", T1."U_VIT_WGSE" as "garansiservice" , T5."Quantity" from   oqut T1   left join nnm1 T2 on T1."Series" = T2."Series"   left join qut1 T5 on T1."DocEntry" = T5."DocEntry"   left join ocpr T3 on T1."CntctCode" = T3."CntctCode" where T1."DocStatus" = ' + "'" + 'O' + "'" + ' and left(T2."SeriesName", 4) = ' + "'" + 'SQSS' + "'" + ' and T1."DocEntry" = ' + "' " + req.query.code + " '" + '';

  connection.runQuery(res, sql);
}
exports.sqss = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'select   T1."DocNum",T1."DocEntry",T1."CardName" from oqut T1 left join nnm1 T2 on T1."Series" = T2."Series" where T1."DocStatus" = ' + "'" + 'O' + "'" + ' and left(T2."SeriesName", 4) = ' + "'" + 'SQSS' + "'" + ' AND T1."DocNum" LIKE ' + "'%" + req.query.code + "%'" + '';

  connection.runQuery(res, sql);
}

exports.inhousesc = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'select T4."DocNum",T4."callID",  T4."internalSN", T4."BPShipAddr",T4."Telephone", T4."itemCode",  T4."itemName",  T4."custmrName",  T4."customer",  T4."Series", T2."SeriesName" from  scl4 T3  left join oscl T4 on T3."SrcvCallID" = T4."callID" left join nnm1 T2 on T4."Series" = T2."Series" where  T3."DocAbs" =  ' + "' " + req.query.code + " '" + '';

  connection.runQuery(res, sql);
}

exports.relationscall = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select C1."SrcvCallID", C1."DocAbs", C1."Object", T1."DocNum", T2."ItemCode", T2."Dscription", T2."Quantity",T1."DocType", T2."U_VIT_QT" as "typeSQTY", T2."U_VIT_FT" as "ItmService" from scl4 C1 left join oqut T1 on C1."DocAbs" = T1."DocEntry" left join qut1 T2 on T1."DocEntry" = T2."DocEntry" left join nnm1 N1 on T1."Series" = N1."Series" where "Object" = 23 and "SrcvCallID" =  ' + "' " + req.query.code + " '" + ' and N1."SeriesName" LIKE ' + "'" + '%SQSI%' + "'" + '';

  connection.runQuery(res, sql);
};

exports.trgetentry = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'select "TrgetEntry" from qut1 where "TrgetEntry" is not null order by "TrgetEntry" desc limit 1';

  connection.runQuery(res, sql);
}

exports.reportwarrantyexp = function(req, res, next) {

  var sql = 'Select   T0."DocNum" as "DocNum",   T0."CardName" as "Name",   T0."U_VIT_NPAN" as "address",   T1."ItemCode" as "ItemCode",   T1."Dscription" as "ItemName",   T1."Quantity" as "qty",   T2."DistNumber" as "SerialNum",   T5."ItmsGrpNam",   T3."DocNum" as "InvoiceDoc",   SUBSTRING(T0."CreateDate", 1, 10) as "TanggalDO",   T0."U_VIT_WGSE" as "WarrantyService",   T0."U_VIT_WGBA" as "WarrantyBattery",   Q6."DocNum" as "Nomor SC" from   odln T0   left join dln1 T1 on T1."DocEntry" = T0."DocEntry"   left join oinv T3 on T0."DocEntry" = T3."DocEntry"   left outer join SRI1 I1 on T1."ItemCode" = I1."ItemCode"   and (    T1."DocEntry" = I1."BaseEntry"     and T1."ObjType" = I1."BaseType"  )   left outer join OSRN T2 on T2."ItemCode" = I1."ItemCode"   and I1."SysSerial" = T2."SysNumber"   left join oitm T4 on T1."ItemCode" = T4."ItemCode"   left join oitb T5 on T4."ItmsGrpCod" = T5."ItmsGrpCod"   left join scl4 Q5 on T0."DocEntry" = Q5."DocAbs"   left join oscl Q6 on Q5."SrcvCallID" = Q6."callID"   or T2."DistNumber" = Q6."internalSN"   left join ocrd Q7 on T0."CardCode" = Q7."CardCode"   left join nnm1 N1 on T0."Series" = N1."Series" where   T0."CANCELED" = ' + "'N'" + ' and SUBSTRING(T0."DocDate", 3,2) = ' + "'" + req.query.code + "'" + ' and T5."ItmsGrpNam" in (' + req.body.itmgrp + ') and N1."SeriesName" NOT LIKE ' + "' " + 'DOSW%' + " '" + '   and N1."SeriesName" NOT LIKE ' + "' " + 'DOSI%' + " '" + ' and Q7."GroupCode" in (' + req.body.grc + ')';

  connection.runQuery(res, sql);
}

exports.cardgroup = function(req, res, next){

  var sql = 'select "GroupCode", "GroupName" from ocrg where "DataSource" = ' + "'" + 'O' + "'" + '';

  connection.runQuery(res, sql);
}

exports.sqservice = function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select   	C4."SrcvCallID",   	T1."DocEntry",  	T0."DocNum",  	N1."SeriesName",  	T1."Dscription", T1."Quantity" ,T1."ItemCode",  	C4."DocAbs",  	T0."CANCELED", C4."Object"  from   	scl4 C4   	left join qut1 T1 on C4."DocAbs" = T1."DocEntry" left join oqut T0 on T1."DocEntry" = T0."DocEntry"  	left join nnm1 N1 on T0."Series" = N1."Series"  where C4."SrcvCallID" = ' + "'" + req.query.code + "'" + ' and C4."Object" = 23 and N1."SeriesName" LIKE ' + "'" + 'SQSI%' + "'" + '';

  connection.runQuery(res, sql);
}


exports.reportpembelian = function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed


  var sql = 'select   T1."DocNum" as "DocNumPO",   SUBSTRING(T1."DocDate", 1, 10) as "PO_Date",   T2."Dscription" as "Item",   T2."ItemCode" as "ItemCode",  T2."Quantity" as "Quantity",  T2."Price" as "UnitPrice",  T2."Quantity" * T2."Price" as "Total",  SUM(T2."Quantity" * T2."Price") OVER (PARTITION BY T1."DocNum") as "TotalPerPO", T2."Currency" as "Currency",  D2."DocNum" as "DocNumGRPO",  SUBSTRING(D2."DocDate", 1, 10) as "GRPO_Date",  N2."DocNum" as "DocNumAPInv",  SUBSTRING(N2."DocDate", 1, 10) as "AP_Date",  V1."DocNum" as "DocNumOP",  SUBSTRING(V1."DocDate", 1, 10) as "OP_Date"from   opor T1   join por1 T2 on T1."DocEntry" = T2."DocEntry"  left join pdn1 D1 on T2."DocEntry" = D1."BaseEntry" and T2."LineNum" = D1."LineNum"  left join opdn D2 on D1."DocEntry" = D2."DocEntry"  left join pch1 N1 on N1."BaseEntry" = D1."DocEntry"  left join opch N2 on N2."DocEntry" = N1."DocEntry"  left join vpm2 V2 on N2."DocEntry" = V2."DocEntry"  left join ovpm V1 on V1."DocEntry" = V2."DocNum" where   T2."Dscription" like ' + "'%" + req.query.item + "%'" + '   and T2."ItemCode" NOT IN (' + "'" + 'IM' + "'" + ',' + "'" + 'OTHERS' + "'" + ',' + "'" + 'OFFICE SUPPLIES' + "'" + ')  and SUBSTRING(T1."DocDate", 1, 10) BETWEEN ' + "'" + req.query.startdate + "'" + '  AND ' + "'" + req.query.enddate + "'" + ' order by   T1."DocDate" desc';

  connection.runQuery(res, sql);
}
