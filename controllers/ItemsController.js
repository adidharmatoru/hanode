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

  var sql = 'select "customer","custmrName","internalSN","wrrntyStrt","wrrntyEnd","itemCode","itemName","instLction" from oins where "status" = '+ "'A'" +' order by "insID" desc';
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
