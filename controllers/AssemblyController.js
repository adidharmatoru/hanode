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

exports.billofmaterial = function(req ,res, next ){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select T1."Code" as "Code",SUBSTRING(T1."CreateDate",1,10) as "CreateDate",T1."Qauntity" as "qty",T1."Name" as "Description",T2."BuyUnitMsr" as "unit" from oitt T1 join oitm T2 on T1."Code"=T2."ItemCode"';

  connection.runQuery(res, sql);
};

exports.billofmaterialdetail = function(req ,res, next ){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select   P1."Father",   P1."Code",   P1."Quantity",   P1."LineText",   P1."Warehouse",   P1."Price",   (P1."Quantity" * P1."Price") as "TotalPrice",  P2."Code" as "ProductCode",   P2."Name" as "Description",  T1."BuyUnitMsr" as "Unit",  P2."Qauntity" as "qty",  T3."UomName" as "UoM",  T2."OnHand" as "Stock",  T3."UomCode"from   ITT1 P1  left join oitt P2 on P1."Father" = P2."Code"  left join oitm T1 on P2."Code"=T1."ItemCode" left join oitm T2 on P1."Code"=T2."ItemCode"  left join ouom T3 on T2."PriceUnit" = T3."UomEntry" where   "Father" =   ' + "'" + req.query.code + "'" + '';

  connection.runQuery(res, sql);
};

exports.itemsap = function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql =' select   oitm."ItemCode",   oitm."ItemName",   oitm."validFor",  oitb."ItmsGrpNam", oitm.U_DM_CAPACITY from oitm join oitb on oitb."ItmsGrpCod" = oitm."ItmsGrpCod" where   oitm."ItemName" LIKE  ' + "'%" + req.query.code + "%'" + ' and oitm."validFor" = ' + "'" + 'Y' + "'" + '';
  connection.runQuery(res, sql);
}

exports.codeproject = function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql ='select "PrjCode","PrjName" from oprj where "PrjCode" LIKE  ' + "'%" + req.query.code + "%'" + '';
  connection.runQuery(res, sql);
}

exports.itemmaterialsap = function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select   T1."ItemCode",T1."ItemName",T2."ItmsGrpCod" from   oitm T1   join oitb T2 on T1."ItmsGrpCod" = T2."ItmsGrpCod" where   T1."validFor" = ' + "'" + 'Y' + "'" + ' and T2."ItmsGrpCod" not in (101,102,103,104,171,289,291,290,295,294,297,233)';

  connection.runQuery(res, sql);
}

exports.whscode = function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select * from owhs';

  connection.runQuery(res, sql);
}

exports.itemdetail = function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select O1."ItemCode", O1."ItemName", O2."WhsCode", O2."OnHand", O2."IsCommited", O2."OnOrder" from oitm O1 left join oitw O2 on O1."ItemCode" = O2."ItemCode" where O1."ItemCode" = ' + "'" + req.query.code + "'" + ' and O2."OnHand" != 0';

  connection.runQuery(res, sql);
}

exports.validasistatus = function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select W1."DocEntry",W1."DocNum" as "DocNumPro", G2."DocNum" as "DocNumGR", I2."DocNum" as "DocNumIssue",G1."BaseEntry" from owor W1 	left join ign1 G1 on W1."DocEntry" = G1."BaseEntry" 	left join oign G2 on G1."DocEntry" = G2."DocEntry"	left join ige1 I1 on W1."DocEntry" = I1."BaseEntry"	left join oige I2 on I1."DocEntry" = I2."DocEntry"	where W1."DocNum" = ' + "'" + req.query.code + "'" + '';
}
