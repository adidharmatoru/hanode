'use strict';

var response = require('../config/res');
var connection = require('../config/database/conn');
var hdbext = require('@sap/hdbext');

// start function
exports.DeliveryGEdanPhilips = function(req, res, next) {
  var sql = 'Select   T0."DocNum" as "DocNum",   T0."CardName" as "Name",   T0."U_VIT_NPAN" as "address",   T1."ItemCode" as "ItemCode",   T1."Dscription" as "ItemName",   T1."Quantity" as "qty",   T2."DistNumber" as "SerialNum",   T3."DocNum" as "InvoiceDoc",  SUBSTRING(T0."CreateDate", 1, 10) as "TanggalDO",  T0."U_VIT_WGSE" as "WarrantyService",  T0."U_VIT_WGBA" as "WarrantyBattery" from odln T0   left join dln1 T1 on T1."DocEntry" = T0."DocEntry"   left join oinv T3 on T0."DocEntry" = T3."DocEntry"   left join osrn T2 on T2."ItemCode" = T1."ItemCode"   left join oitm T4 on T1."ItemCode" = T4."ItemCode"  left join oitb T5 on T4."ItmsGrpCod" = T5."ItmsGrpCod" where T0."CardCode" in ( ' + "'C00646'" + ',' + "'C00502'" + ',' + "'C0102828'" + ') and T0."CANCELED" = ' + "'N'" + ' and SUBSTRING(T0."DocDate", 3,2) = ' + "'" + req.query.code + "'" + ' and T5."ItmsGrpNam" in (' + req.body.itmgrp + ') ';

  connection.runQuery(res, sql);
};
