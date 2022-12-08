'use strict';

var response = require('../config/res');
var connection = require('../config/database/conn');
var hdbext = require('@sap/hdbext');

// start function
exports.profitandlossOGdetail = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select   P1."DocNum",   P1."DocEntry",  P1."Series",   P2."PrjName",  P1."DocTotal",   P1."PrjCode",  P3."AcctCode",  P3."AcctName",  P3."Descrip",  P3."AcctCode",  P3."SumApplied",  P1."DocType"from   ovpm P1   join oprj P2 on P1."PrjCode" = P2."PrjCode"   left join vpm4 P3 on P1."DocEntry"=P3."DocNum"order by   P2."PrjCode" desc';

  connection.runQuery(res, sql);
};

exports.profitandlossOG = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select   P1."DocNum",   P1."DocEntry",  P1."Series",   P2."PrjName",  P1."DocTotal",   P1."PrjCode",  P1."DocType"from   ovpm P1   join oprj P2 on P1."PrjCode" = P2."PrjCode" order by   P2."PrjCode" desc';

  connection.runQuery(res, sql);
};

exports.profitandlossSO = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'SELECT   distinct T0."Project" as "PrjCode",   T1."DocNum" as "SO DocNum",   left(T1."DocDate", 10) as "SO Date",  T1."CardName" as "Customer",   T1."NumAtCard" as "PO",   T1."DocTotal",   T1."U_VIT_TOPY"FROM   RDR1 T0   JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry"   join oprj prj on T0."Project" = prj."PrjCode" where   T0."Price" != 0 order by   T0."Project" desc';

  connection.runQuery(res, sql);
};

exports.profitandlossSOdetail = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'SELECT   distinct T0."Project" as "PrjCode",   T1."DocNum" as "SO DocNum",   left(T1."DocDate", 10) as "SO Date",   T2."SlpName" as "SalesPerson",   T1."CardName" as "Customer",   T1."NumAtCard" as "PO",   T0."ItemCode" as "ItemCode",   T0."Dscription" as "ItemName",   T0."Quantity",   T0."Price",   T0."LineTotal",   T1."DocTotal",   T1."U_VIT_TOPY",   dln."DocNum" as "Delivery",   left(dln."DocDate", 10) as "DeliveryDate",   dln."U_VIT_DIOL" as "Receiver" FROM   RDR1 T0   JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry"   left join dln1 dln1 on T0."DocEntry" = dln1."BaseEntry"   and T0."LineNum" = dln1."BaseLine"   and T0."Project" = dln1."Project"   left join odln dln on dln1."DocEntry" = dln."DocEntry"   left join oinv inv on T1."DocEntry" = inv."DocEntry"   left JOIN OSLP T2 ON T2."SlpCode" = T1."SlpCode"   left join oprj prj on T0."Project" = prj."PrjCode" where   T0."Price" != 0 prj."PrjCode" = ' + "'" + req.body.code + "'" + ' order by   T0."Project" desc';

  connection.runQuery(res, sql);
};
