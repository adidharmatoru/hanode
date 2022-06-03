'use strict';

var response = require('../config/res');
var connection = require('../config/database/conn');
var hdbext = require('@sap/hdbext');

// start function
exports.DeliveryGEdanPhilips = function(req, res, next) {
  var sql = 'Select T0."DocNum" as "DocNum", T0."CardName" as "Name",T0."U_VIT_NPAN" as "address",T1."ItemCode" as "ItemCode", T1."Dscription" as "ItemName",T1."Quantity" as "qty",T2."DistNumber" as "SerialNum", T3."DocNum" as "InvoiceDoc" from odln T0 left join dln1 T1 on T1."DocEntry"=T0."DocEntry" left join oinv T3 on T0."DocEntry"=T3."DocEntry" left join osrn T2 on T2."ItemCode"=T1."ItemCode" where T0."CardCode" in ( ' + "'C00646'" + ',' + "'C00502'" + ') and T0."CANCELED" = ' + "'N'" + ' and SUBSTRING(T0."DocDate", 3,2) = ' + "'" + req.query.code + "'" + '';

  connection.runQuery(res, sql);
};
