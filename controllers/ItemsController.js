'use strict';

var response = require('../config/res');
var connection = require('../config/database/conn');
var hdbext = require('@sap/hdbext');


exports.masterItems = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    var sql = 'select distinct "ItemName" as "Name","ItemCode" as "Code","U_DM_CAPACITY" as "Capacity","U_DM_VOLTAGE" as "Voltage","U_DM_PHASE" as "Phase","U_DM_TYPE" as "Type","U_DM_MODEL" as "Model","U_DM_STATUS" as "Status","U_DM_BATTERY" as "Battery","U_DM_COO" as "Coo","U_DM_MEASUREMENT" as "Measurement","ItmsGrpCod" from oitm WHERE "ItmsGrpCod" in (' + req.query.ItmsGrpNam + ')';
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

  var sql = 'select "insID" as "idEC", "custmrName" as "Customer Name","internalSN" as "Serial Number","wrrntyStrt" as "Start Warranty","wrrntyEnd" as "End Warranty","itemCode" as "Item Code","itemName" as "Item Name","instLction" as "Location",SUBSTRING("createDate",1,10) as "createDate",SUBSTRING("dlvryDate",1,10) as "delivery Date","deliveryNo","street","block","zip","city","county","country","state" from oins where "internalSN" =' + "'" + req.query.code + "'" + '';
  connection.runQuery(res, sql);
}

exports.ecScall = function(req,res,next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'select "callID",SUBSTRING("createDate",1,10) as "createDate","subject" from oscl where "internalSN"=' + "'" + req.query.code + "'" + '';
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
