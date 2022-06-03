'use strict';

var response = require('../config/res');
var connection = require('../config/database/conn');
var hdbext = require('@sap/hdbext');

// start function
exports.DeliveryGEdanPhilips = function(req, res, next) {
  var sql = 'Select T0."DocNum" as "DocNum", T0."CardName" as "Name",T0."U_VIT_NPAN" as "address",T1."ItemCode" as "ItemCode", T1."Dscription" as "ItemName",T1."Quantity" as "qty",T2."DistNumber" as "SerialNum", T3."DocNum" as "InvoiceDoc",T5."ItmsGrpNam" as "ItmsGrpNam" from odln T0 left join dln1 T1 on T1."DocEntry"=T0."DocEntry" join oinv T3 on T0."DocEntry"=T3."DocEntry" left join osrn T2 on T2."ItemCode"=T1."ItemCode" left join oitm T4 on T2."ItemCode" = T4."ItemCode" left join oitb T5 on T4."ItmsGrpCod"=T5."ItmsGrpCod" where T0."CardCode" in ( ' + "'C00646'" + ',' + "'C00646'" + ') and T0."CANCELED" = ' + "'N'" + ' and T4."ItmsGrpCod" in ( ' + "'101'" + ',' + "'102'" + ',' + "'103'" + ',' + "'104'" + ',' + "'144'" + ',' + "'145'" + ',' + "'156'" + ',' + "'157'" + ',' + "'158'" + ',' + "'185'" + ') and SUBSTRING(T0."DocDate", 3,2) = ' + "'" + req.query.code + "'" + '';

  connection.runQuery(res, sql);
};
