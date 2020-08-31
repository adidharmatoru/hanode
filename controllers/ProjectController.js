'use strict';

var response = require('../config/res');
var connection = require('../config/database/conn');
var hdbext = require('@sap/hdbext');

// start function
exports.index = function(req, res, next) {
  var sql = 'select * from oprj ORDER BY "U_StartDate" DESC limit 100'

  connection.runQuery(res, sql);
};

exports.show = function(req, res, next) {
  var sql = 'select * from oprj where "PrjCode" = ' + "'" + req.body.id + "'";

  connection.runQuery(res, sql);
};

exports.customer = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select "CardCode", "CardName" from OCRD where "CardCode" = ' + "'" + req.query.code + "'";

  connection.runQuery(res, sql);
};

exports.so = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select * from ordr join nnm1 on ordr."Series" = nnm1."Series" where LENgth(nnm1."SeriesName") = 4 and ordr."DocType" = ' + "'" + 'I' + "'" + ' and ordr."DocStatus" = ' + "'" + 'O' + "'" + ' and ordr.CANCELED = ' + "'" + 'N' + "'" + ' and ordr."DocNum" LIKE  ' + "'%" + req.query.code + "%'" + ' order by ordr."DocNum" DESC limit 20';

  connection.runQuery(res, sql);
};

exports.contact = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select "CntctCode" as "ContactCode", "Name", "Tel1" as "Phone", "Address" from ocpr where "CardCode" =  ' + "'" + req.query.code + "'";

  connection.runQuery(res, sql);
};

exports.contactPerson = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select "CntctCode" as "ContactCode", "Name", "Tel1" as "Phone", "Address" from ocpr where "CntctCode" =  ' + "'" + req.query.code + "'";

  connection.runQuery(res, sql);
};

exports.countProject = function(req, res, next) {
  var strDate = new Date();
  var shortYear = strDate.getFullYear();
  var twoDigitYear = shortYear.toString().substr(-2);
  var sql = 'select count(*) as "ProjectCount" from oprj where left("PrjCode", 2) = ' + "'" + twoDigitYear + "'" + 'and "U_StartDate" is not null';

  connection.runQuery(res, sql);
};

exports.sales = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select oslp."SlpName" as "Name" from ordr join oslp on ordr."SlpCode" = oslp."SlpCode" where ordr."SlpCode" = ' + "'" + req.query.code + "'";

  connection.runQuery(res, sql);
};

exports.primarySoldItems = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'SELECT T0."Project" as "PrjCode",left(T0."DocDate", 10) as "SO Date",T2."SlpName" as "SalesPerson",T1."CardName" as "Customer",T1."NumAtCard" as "PO",T0."ItemCode" as "ItemCode",T0."Dscription" as "ItemName",T0."Quantity",T0."Price",T0."LineTotal", T1."U_VIT_TOPY", dln."DocNum" as "Delivery", left(dln."DocDate", 10) as "DeliveryDate", dln."U_VIT_DIOL" as "Receiver"FROM RDR1 T0 JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry" left join dln1 dln1 on T0."ItemCode" = dln1."ItemCode" and T0."Project" = dln1."Project" join odln dln on dln1."DocEntry" = dln."DocEntry" left join oinv inv on T1."DocEntry" = inv."DocEntry" left JOIN OSLP T2 ON T2."SlpCode" = T1."SlpCode"left join oprj prj on T0."Project" = prj."PrjCode" where T0."Project" is not null and T0."Project" != ' + "'" + "'" +'and T0."Price" != 0 and left(prj."U_StartDate", 4) = year(CURRENT_DATE) order by T0."Project"';

  connection.runQuery(res, sql);
};

exports.secondarySoldItems = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'SELECT distinct T0."Project" as "PrjCode",left(T0."DocDate", 10) as "SO Date",T2."SlpName" as "SalesPerson",T1."CardName" as "Customer",T1."NumAtCard" as "PO",T0."ItemCode" as "ItemCode",T0."Dscription" as "ItemName",T0."Quantity",T0."Price",T0."LineTotal", T1."U_VIT_TOPY", dln."DocNum" as "Delivery", left(dln."DocDate", 10) as "DeliveryDate", dln."U_VIT_DIOL" as "Receiver"FROM RDR1 T0 JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry" left join dln1 dln1 on T0."ItemCode" = dln1."ItemCode" and T0."Project" = dln1."Project" join odln dln on dln1."DocEntry" = dln."DocEntry" left join oinv inv on T1."DocEntry" = inv."DocEntry" left JOIN OSLP T2 ON T2."SlpCode" = T1."SlpCode"left join oprj prj on T0."Project" = prj."PrjCode" where T0."Project" is not null and T0."Project" != ' + "'" + "'" +'and T0."Price" = 0 and left(prj."U_StartDate", 4) = year(CURRENT_DATE) order by T0."Project"';

  connection.runQuery(res, sql);
};
