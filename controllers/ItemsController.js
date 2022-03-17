'use strict';

var response = require('../config/res');
var connection = require('../config/database/conn');
var hdbext = require('@sap/hdbext');


exports.masterItems = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  // var sql = 'select * from oitm T1 Where "ItemName" LIKE ' + "'%"  + req.query.code + "%'" + ' order by T1."ItemCode" limit 5';
  var sql = 'select "ItemName" as "Name","ItemCode" as "Code","U_DM_CAPACITY" as "Capacity","U_DM_VOLTAGE" as "Voltage","U_DM_PHASE" as "Phase","U_DM_TYPE" as "Type","U_DM_MODEL" as "Model","U_DM_STATUS" as "Status","U_DM_BATTERY" as "Battery","U_DM_COO" as "Coo","U_DM_MEASUREMENT" as "Measurement" from oitm WHERE "ItmsGrpCod" in (' + "'290'" + ',' + "'180'" + ',' + "'273'" + ',' + "'101'" + ',' + "'102'" + ',' + "'144'" + ',' + "'145'" + ') and "U_DM_CAPACITY" IS NULL or "U_DM_VOLTAGE" IS NULL or "U_DM_PHASE" IS NULL or "U_DM_TYPE" IS NULL or "U_DM_MODEL" IS NULL or "U_DM_STATUS" IS NULL or "U_DM_BATTERY" IS NULL or "U_DM_COO" IS NULL or "U_DM_MEASUREMENT" IS NULL';
  connection.runQuery(res, sql);
};
