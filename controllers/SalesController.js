'use strict';

var response = require('../config/res');
var connection = require('../config/database/conn');
var hdbext = require('@sap/hdbext');

// start function
exports.DeliveryGEdanPhilips = function(req, res, next) {
  var sql = 'Select   T0."DocNum" as "DocNum",   T0."CardName" as "Name",   T0."U_VIT_NPAN" as "address",   T1."ItemCode" as "ItemCode",   T1."Dscription" as "ItemName",   T1."Quantity" as "qty",   T2."DistNumber" as "SerialNum",   T3."DocNum" as "InvoiceDoc",  SUBSTRING(T0."CreateDate", 1, 10) as "TanggalDO",  T0."U_VIT_WGSE" as "WarrantyService",  T0."U_VIT_WGBA" as "WarrantyBattery",Q6."DocNum" as "Nomor SC" from odln T0   left join dln1 T1 on T1."DocEntry" = T0."DocEntry"   left join oinv T3 on T0."DocEntry" = T3."DocEntry"   left outer join SRI1 I1 on T1."ItemCode" = I1."ItemCode"   and (    T1."DocEntry" = I1."BaseEntry"     and T1."ObjType" = I1."BaseType"  )   left outer join OSRN T2 on T2."ItemCode" = I1."ItemCode"   and I1."SysSerial" = T2."SysNumber"  left join oitm T4 on T1."ItemCode" = T4."ItemCode"   left join oitb T5 on T4."ItmsGrpCod" = T5."ItmsGrpCod"   left join scl4 Q5 on T0."DocEntry" = Q5."DocAbs"   left join oscl Q6 on Q5."SrcvCallID" = Q6."callID"   left join ocrd Q7 on T0."CardCode" = Q7."CardCode" where T0."CardCode" in ( ' + "'C00646'" + ',' + "'C00502'" + ',' + "'C0102828'" + ',' + "'C0102679'" + ') and T0."CANCELED" = ' + "'N'" + ' and SUBSTRING(T0."DocDate", 3,2) = ' + "'" + req.query.code + "'" + ' and T5."ItmsGrpNam" in (' + req.body.itmgrp + ') or Q7."GroupCode" = ' + "'" + '107' + "'" + ' and T0."CANCELED" = ' + "'N'" + ' and SUBSTRING(T0."DocDate", 3,2) = ' + "'" + req.query.code + "'" + ' and T5."ItmsGrpNam" in (' + req.body.itmgrp + ') ';

  connection.runQuery(res, sql);
};

exports.DeliveryGEdanPhilipsDetail = function(req, res, next) {
  var sql = 'Select T0."DocNum" as "DocNum",   T0."CardName" as "Name",   T0."U_VIT_NPAN" as "address",   T1."ItemCode" as "ItemCode",   T1."Dscription" as "ItemName",   T1."Quantity" as "qty",   T2."DistNumber" as "SerialNum",   T3."DocNum" as "InvoiceDoc",   SUBSTRING(T0."CreateDate", 1, 10) as "TanggalDO",   T0."U_VIT_WGSE" as "WarrantyService",   T0."U_VIT_WGBA" as "WarrantyBattery",   Q6."DocNum" as "Nomor SC" from   odln T0   left join dln1 T1 on T1."DocEntry" = T0."DocEntry"   left join oinv T3 on T0."DocEntry" = T3."DocEntry"   left outer join SRI1 I1 on T1."ItemCode" = I1."ItemCode"   and (    T1."DocEntry" = I1."BaseEntry"     and T1."ObjType" = I1."BaseType"  )   left outer join OSRN T2 on T2."ItemCode" = I1."ItemCode"   and I1."SysSerial" = T2."SysNumber"   left join oitm T4 on T1."ItemCode" = T4."ItemCode"   left join oitb T5 on T4."ItmsGrpCod" = T5."ItmsGrpCod"   left join scl4 Q5 on T0."DocEntry" = Q5."DocAbs"   left join oscl Q6 on Q5."SrcvCallID" = Q6."callID"   left join ocrd Q7 on T0."CardCode" = Q7."CardCode" where   T0."DocNum" = ' + "' " + req.query.code + " '" + '  and T5."ItmsGrpNam" in (' + "'EATON THREE PHASE'" + ',' + "'BATTERY 12V'" + ',' + "'BATTERY 2V'" + ',' + "'BATTERY 6V'" + ')';

  connection.runQuery(res, sql);
};

exports.DeliveryRS = function(req, res, next) {
  var sql = 'SELECT   T4."DistNumber"from   ODLN T0   inner join DLN1 T1 on T0."DocEntry" = T1."DocEntry"   left outer join SRI1 I1 on T1."ItemCode" = I1."ItemCode"   and (    T1."DocEntry" = I1."BaseEntry"     and T1."ObjType" = I1."BaseType"  )   left outer join OSRN T4 on T4."ItemCode" = I1."ItemCode"   and I1."SysSerial" = T4."SysNumber"  left join oitm T6 on T1."ItemCode" = T6."ItemCode"   left join oitb T5 on T6."ItmsGrpCod" = T5."ItmsGrpCod" where  T0."DocNum" = ' + "'" + req.query.code + "'" + ' and T5."ItmsGrpNam" in (' + "'EATON SINGLE PHASE'" + ',' + "'EATON THREE PHASE'" + ')';

  connection.runQuery(res, sql);
};

exports.DeliveryRSContract = function(req, res, next) {
  var sql = 'select distinct  octr."ContractID",   octr."CstmrName",  SUBSTRING(octr."StartDate", 1, 10) AS "StartDate",   SUBSTRING(octr."EndDate", 1, 10) as "EndDate",   SUBSTRING(octr."TermDate", 1, 10) as "TermDate",   octr."SrvcType",  oins."internalSN",  oins."instLction",  oins."itemName",  oins."itemCode",  ordr."Quantity"from   octr   left join ctr1 on octr."ContractID" = ctr1."ContractID"  left join oins on ctr1."InternalSN" = oins."internalSN"   left join ocrd Q7 on octr."CstmrCode" = Q7."CardCode" where Q7."GroupCode" = ' + "'" + '107' + "'" + ' ';

  connection.runQuery(res, sql);
};

exports.sqssdetail = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'select   T1."DocNum", T1."CardCode",T1."Series",  SUBSTRING(T1."DocDueDate",1,10) as "DocDueDate",  T1."Address",  T3."Tel1",  T3."Tel2",  T3."E_MailL", T3."Name" as "pic", T5."ItemCode",   T5."Dscription", T5."Price",T1."DocType" ,  T5."Quantity" from   oqut T1   left join nnm1 T2 on T1."Series" = T2."Series"   left join qut1 T5 on T1."DocEntry" = T5."DocEntry"   left join ocpr T3 on T1."CntctCode" = T3."CntctCode" where T1."DocStatus" = ' + "'" + 'O' + "'" + ' and left(T2."SeriesName", 4) = ' + "'" + 'SQSS' + "'" + ' and T1."DocEntry" = ' + "' " + req.query.code + " '" + '';

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

exports.trgetentry = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'select "TrgetEntry" from qut1 where "TrgetEntry" is not null order by "TrgetEntry" desc limit 1';

  connection.runQuery(res, sql);
}
