'use strict';

var response = require('../config/res');
var connection = require('../config/database/conn');
var hdbext = require('@sap/hdbext');


exports.masterItems = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select   distinct   oi."ItemName" as "Name",   oi."ItemCode" as "Code",   oi."U_DM_CAPACITY" as "Capacity",   oi."U_DM_VOLTAGE" as "Voltage",   oi."U_DM_PHASE" as "Phase",   oi."U_DM_TYPE" as "Type",   oi."U_DM_MODEL" as "Model",   oi."U_DM_STATUS" as "Status",   oi."U_DM_BATTERY" as "Battery",   oi."U_DM_COO" as "Coo",   oi."U_DM_MEASUREMENT" as "Measurement",   oi."ItmsGrpCod",  t1."Price" from   oitm oi left join itm1 t1 on t1."ItemCode" = oi."ItemCode" where "ItmsGrpCod" in (' + req.query.ItmsGrpNam + ')';
  connection.runQuery(res, sql);
};

exports.itemsgroup = function(req,res,next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'select oitm."ItmsGrpCod",oitb."ItmsGrpNam" from oitm join oitb on oitm."ItmsGrpCod"=oitb."ItmsGrpCod"';
  connection.runQuery(res, sql);
}

exports.equipmentcard = function(req,res,next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'select distinct a."insID" as "idEC", a."custmrName" as "Customer Name", a."internalSN" as "Serial Number", SUBSTRING(b."DocDate",1,10) as "Start Warranty", a."wrrntyEnd" as "End Warranty", a."itemCode" as "Item Code", a."itemName" as "Item Name", a."instLction" as "Location" from oins a left join dln1 b on a."delivery"=b."DocEntry"where "status" = ' + "'" + 'A' + "'" + ' order by "insID" desc limit 20';
  connection.runQuery(res, sql);
}

exports.ecDetail = function(req,res,next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'select oins."insID" as "idEC",oins."customer" as "cardCust", oins."custmrName" as "Customer Name","internalSN" as "Serial Number",oins."wrrntyStrt" as "Start Warranty",oins."wrrntyEnd" as "End Warranty",oins."itemCode" as "Item Code",oins."itemName" as "Item Name",oins."instLction" as "Location",SUBSTRING(oins."createDate",1,10) as "createDate",SUBSTRING(oins."dlvryDate",1,10) as "delivery Date",oins."deliveryNo" as "deliveryNo",oins."street" as "street",oins."status" as "Status", oins."block" as "block",oins."zip" as "zip",oins."city" as "city",oins."country" as "country",oins."county" as "county",oins."state" as "state", odln."U_VIT_WGSA" as "WarrantySparePart",   odln."U_VIT_WGBA" as "WarrantyBattery", odln."U_VIT_WGSE" as "WarrantyService"  from oins left join odln on oins."delivery" = odln."DocEntry"  where "internalSN" =' + "'" + req.query.code + "'" + ' and "status" = ' + "'" + 'A' + "'" + '';
  connection.runQuery(res, sql);
}

exports.ecScall = function(req,res,next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'select "callID","DocNum",SUBSTRING("createDate",1,10) as "createDate","subject" from oscl where "internalSN"=' + "'" + req.query.code + "'" + '';
  connection.runQuery(res, sql);
}

exports.ecScon = function(req,res,next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'select octr."ContractID",SUBSTRING(octr."StartDate", 1,10) AS "StartDate",SUBSTRING(octr."EndDate", 1, 10) as "EndDate",SUBSTRING(octr."TermDate", 1,10) as "TermDate",octr."SrvcType" from octr left join ctr1 on octr."ContractID"=ctr1."ContractID" where ctr1."InternalSN"=' + "'" + req.query.code + "'" + '';
  connection.runQuery(res, sql);
}

exports.ecTransaction = function(req,res,next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'select distinct T0."ItemCode",T2."LogEntry",T2."DocNum",SUBSTRING(T2."DocDate",1,10) as "DocDate",T2."LocCode",T2."CardCode",T2."CardName",T2."DocType" from osrn T0 left join itl1 T1 on T0."AbsEntry"=T1."MdAbsEntry" left join oitl T2 on T1."LogEntry"=T2."LogEntry" where T0."DistNumber"=' + "'" + req.query.code + "'" + '';
  connection.runQuery(res, sql);
}

exports.itemsAll = function(req,res,next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'select "ItemCode","ItemName" from oitm where "ItemName" LIKE  ' + "'%" + req.query.code + "%'" + ' order by "ItemName" DESC';
  connection.runQuery(res, sql);
}

exports.itemName = function(req,res,next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'select "ItemCode","ItemName" from oitm where "ItemCode"  =' + "'" + req.query.code + "'" + ' order by "ItemName" DESC';
  connection.runQuery(res, sql);
}
