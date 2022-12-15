'use strict';

var response = require('../config/res');
var connection = require('../config/database/conn');
var hdbext = require('@sap/hdbext');

// start function
exports.productionorder = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select * from owor where SUBSTRING("CreateDate",1,4) = ' + "'" + req.query.year + "'" + ' order by "DocEntry" DESC';

  connection.runQuery(res, sql);
};

exports.detailproductionorder = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select ow."DocEntry",   ow."DocNum",   ow."ItemCode",   ow."ProdName",   ow."Status",   SUBSTRING(ow."DueDate", 1, 10) as "DueDate",  SUBSTRING(ow."CloseDate", 1, 10) as "CloseDate",  SUBSTRING(ow."CreateDate", 1, 10) as "CreateDate",  ow."OriginType",  ow."Warehouse",ow."PlannedQty" as "Qty", ow."CmpltQty" as "CompletedQty", ow."RjctQty" as "RejectedQty", ow."Comments", ow1."ItemCode" as "ItemAss",   ow1."BaseQty",   ow1."PlannedQty",   ow1."IssuedQty",   ow1."wareHouse",   ow1."LineText" ,  ow1."UomCode",  t1."ItemName" as "ItemNameAss",  t1."BuyUnitMsr" as "UomName" from   owor ow   left join wor1 ow1 on ow."DocEntry" = ow1."DocEntry"  left join oitm t1 on ow1."ItemCode" = t1."ItemCode" where ow."DocNum" = ' + "'" + req.query.code + "'" + ' order by ow1."VisOrder" ASC';

  connection.runQuery(res, sql);
};

exports.billofmaterial = function(req ,res, nesl ){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select T1."Code" as "Code",SUBSTRING(T1."CreateDate",1,10) as "CreateDate",T1."Qauntity" as "qty",T1."Name" as "Description",T2."BuyUnitMsrser" as "unit" from oitt T1 join oitm T2 on T1."Code"=T2."ItemCode" where SUBSTRING(T1."CreateDate",1,4) = ' + "'" + req.query.year + "'" + ';';

  connection.runQuery(res, sql);
};

exports.billofmaterialdetail = function(req ,res, nesl ){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select "Father", "Code","Quantity","LineText", "Warehouse","Price" from ITT1 where "Father"=  ' + "'" + req.query.code + "'" + ';';

  connection.runQuery(res, sql);
};
