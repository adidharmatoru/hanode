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

  var sql = 'select "CardCode", "CardName", "Phone1" from OCRD where "CardCode" = ' + "'" + req.query.code + "'";

  connection.runQuery(res, sql);
};

exports.so = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select * from ordr join nnm1 on ordr."Series" = nnm1."Series" where LENgth(nnm1."SeriesName") = 4 and ordr."DocStatus" = ' + "'" + 'O' + "'" + ' and ordr.CANCELED = ' + "'" + 'N' + "'" + ' and ordr."DocNum" LIKE  ' + "'%" + req.query.code + "%'" + ' order by ordr."DocNum" DESC limit 20';
  // var sql = 'select * from ordr DESC limit 5';

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

  var sql = 'select "CntctCode" as "ContactCode", "Name", "Tel1" as "Phone", "Address", "E_MailL" as "Email" from ocpr where "CntctCode" =  ' + "'" + req.query.code + "'";

  connection.runQuery(res, sql);
};

exports.countProject = function(req, res, next) {
  var strDate = new Date();
  var shortYear = strDate.getFullYear();
  var shortMonth = ("0" + (strDate.getMonth() + 1)).slice(-2);

  var sql = 'select count(*) as "ProjectCount" from oprj where (left("U_StartDate", 4) = ' + "'" + shortYear + "'" + ' and substring("U_StartDate", 6,2) = ' + "'" + shortMonth + "'" + ') and "U_StartDate" is not null';

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

  // var sql = 'SELECT distinct T0."Project" as "PrjCode", T1."DocNum" as "SO DocNum", left(T0."DocDate", 10) as "SO Date",T2."SlpName" as "SalesPerson",T1."CardName" as "Customer",T1."NumAtCard" as "PO",T0."ItemCode" as "ItemCode",T0."Dscription" as "ItemName",dln1."Quantity",dln1."Price",T0."LineTotal", T1."U_VIT_TOPY", dln."DocNum" as "Delivery", left(dln."DocDate", 10) as "DeliveryDate", dln."U_VIT_DIOL" as "Receiver"FROM RDR1 T0 JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry" left join dln1 dln1 on T0."Dscription" = dln1."Dscription" and T0."Project" = dln1."Project" left join odln dln on dln1."DocEntry" = dln."DocEntry" left join oinv inv on T1."DocEntry" = inv."DocEntry" left JOIN OSLP T2 ON T2."SlpCode" = T1."SlpCode" left join oprj prj on T0."Project" = prj."PrjCode" where T0."Project" is not null and T0."Project" != ' + "'" + "'" +' and (T0."Dscription" LIKE  ' + "'%EATON" + "%'" + ' or T0."Dscription" LIKE  ' + "'%LKPP" + "%'" + ' or T0."Dscription" LIKE  ' + "'%PENGIRIMAN" + "%'" + ' or T0."Dscription" LIKE  ' + "'%PANEL" + "%'" + ') and year(left(prj."U_StartDate", 4)) = year(CURRENT_DATE) and dln."CANCELED" != ' + "'Y" + "'" +' order by T0."Project"';

  var sql = 'SELECT distinct T0."Project" as "PrjCode", T1."DocNum" as "SO DocNum", oinv."DocStatus" as "Invoice Status",  left(T1."DocDate", 10) as "SO Date",T2."SlpName" as "SalesPerson",T1."CardName" as "Customer",T1."NumAtCard" as "PO",T0."ItemCode" as "ItemCode",case T1."DocType" when ' + "'" + 'I' + "'" + ' then T0."Dscription" else case when length(T0."Dscription") > coalesce(length(T0.u_vit_ft),	0) then T0."Dscription" else TO_VARCHAR(T0.U_VIT_FT) end end as "ItemName", case T1."DocType" when ' + "'" + 'I' + "'" + ' then T0."Quantity" else T0."U_VIT_QT" end as "Quantity",T0."Price",T0."LineTotal", T1."U_VIT_TOPY", dln."DocNum" as "Delivery", left(dln."DocDueDate", 10) as "DeliveryDate", dln."U_VIT_DIOL" as "Receiver"FROM RDR1 T0 JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry" left join dln1 dln1 on T0."DocEntry" = dln1."BaseEntry" and T0."LineNum" = dln1."BaseLine" and T0."Project" = dln1."Project" left join odln dln on dln1."DocEntry" = dln."DocEntry" left join oprj prj on T0."Project" = prj."PrjCode" left join inv1 inv1 on prj."PrjCode" = inv1."Project" left join oinv oinv on inv1."DocEntry" = oinv."DocEntry" left JOIN OSLP T2 ON T2."SlpCode" = T1."SlpCode" where T0."Project" in (' + req.body.prj + ') and T0."Price" != 0 order by T0."Project"';

  connection.runQuery(res, sql);
};

exports.secondarySoldItems = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  // var sql = 'SELECT distinct T0."Project" as "PrjCode", T1."DocNum" as "SO DocNum", left(T0."DocDate", 10) as "SO Date",T2."SlpName" as "SalesPerson",T1."CardName" as "Customer",T1."NumAtCard" as "PO",T0."ItemCode" as "ItemCode",T0."Dscription" as "ItemName",dln1."Quantity",dln1."Price",T0."LineTotal", T1."U_VIT_TOPY", dln."DocNum" as "Delivery", left(dln."DocDate", 10) as "DeliveryDate", dln."U_VIT_DIOL" as "Receiver"FROM RDR1 T0 JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry" left join dln1 dln1 on T0."Dscription" = dln1."Dscription" and T0."Project" = dln1."Project" left join odln dln on dln1."DocEntry" = dln."DocEntry" left join oinv inv on T1."DocEntry" = inv."DocEntry" left JOIN OSLP T2 ON T2."SlpCode" = T1."SlpCode" left join oprj prj on T0."Project" = prj."PrjCode" where T0."Project" is not null and T0."Project" != ' + "'" + "'" +' and (T0."Dscription" NOT LIKE  ' + "'%EATON" + "%'" + ' or T0."Dscription" NOT LIKE  ' + "'%LKPP" + "%'" + 'or T0."Dscription" NOT LIKE  ' + "'%PENGIRIMAN" + "%'" + 'or T0."Dscription" NOT LIKE  ' + "'%PANEL" + "%'" + ') and left(prj."U_StartDate", 4) = year(CURRENT_DATE) and dln."CANCELED" != ' + "'Y" + "'" +'order by T0."Project"';

  var sql = 'SELECT distinct T0."Project" as "PrjCode", T1."DocNum" as "SO DocNum", left(T1."DocDate", 10) as "SO Date",T2."SlpName" as "SalesPerson",T1."CardName" as "Customer",T1."NumAtCard" as "PO",T0."ItemCode" as "ItemCode",T0."Dscription" as "ItemName",T0."Quantity",T0."Price",T0."LineTotal", T1."U_VIT_TOPY", dln."DocNum" as "Delivery", left(dln."DocDate", 10) as "DeliveryDate", dln."U_VIT_DIOL" as "Receiver"FROM RDR1 T0 JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry" left join dln1 dln1 on T0."DocEntry" = dln1."BaseEntry" and T0."LineNum" = dln1."BaseLine" and T0."Project" = dln1."Project" left join odln dln on dln1."DocEntry" = dln."DocEntry" left join oinv inv on T1."DocEntry" = inv."DocEntry" left JOIN OSLP T2 ON T2."SlpCode" = T1."SlpCode" left join oprj prj on T0."Project" = prj."PrjCode" where T0."Project" in (' + req.body.prj + ') and T0."Price" = 0 order by T0."Project"';

  connection.runQuery(res, sql);
};

exports.primarySoldItems1 = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  // var sql = 'SELECT distinct T0."Project" as "PrjCode", T1."DocNum" as "SO DocNum", left(T0."DocDate", 10) as "SO Date",T2."SlpName" as "SalesPerson",T1."CardName" as "Customer",T1."NumAtCard" as "PO",T0."ItemCode" as "ItemCode",T0."Dscription" as "ItemName",dln1."Quantity",dln1."Price",T0."LineTotal", T1."U_VIT_TOPY", dln."DocNum" as "Delivery", left(dln."DocDate", 10) as "DeliveryDate", dln."U_VIT_DIOL" as "Receiver"FROM RDR1 T0 JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry" left join dln1 dln1 on T0."Dscription" = dln1."Dscription" and T0."Project" = dln1."Project" left join odln dln on dln1."DocEntry" = dln."DocEntry" left join oinv inv on T1."DocEntry" = inv."DocEntry" left JOIN OSLP T2 ON T2."SlpCode" = T1."SlpCode" left join oprj prj on T0."Project" = prj."PrjCode" where T0."Project" is not null and T0."Project" != ' + "'" + "'" +' and (T0."Dscription" LIKE  ' + "'%EATON" + "%'" + ' or T0."Dscription" LIKE  ' + "'%LKPP" + "%'" + ' or T0."Dscription" LIKE  ' + "'%PENGIRIMAN" + "%'" + ' or T0."Dscription" LIKE  ' + "'%PANEL" + "%'" + ') and year(left(prj."U_StartDate", 4)) = year(CURRENT_DATE) and dln."CANCELED" != ' + "'Y" + "'" +' order by T0."Project"';

  var sql = 'SELECT T0."Project" as "PrjCode",T1."DocNum" as "SODocNum", left(T1."DocDate", 10) as "SO Date", T2."SlpName" as "SalesPerson", T1."CardName" as "Customer", T1."NumAtCard" as "PO", T0."ItemCode" as "ItemCode", T0."Dscription" as "ItemName", T0."Quantity", T0."Price", T0."LineTotal",  T1."U_VIT_TOPY", nnm1."BeginStr" || ' + "'-'" + ' || dln."DocNum" as "Delivery No", dln."U_VIT_NPAN" as "Delivery Address", left(dln."DocDate", 10) as "DeliveryDate", dln."U_VIT_DIOL" as "Receiver" , T0."SerialNum" as "SerialNumber" FROM RDR1 T0 JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry" left join dln1 dln1 on T0."DocEntry" = dln1."BaseEntry" and T0."LineNum" = dln1."BaseLine" and T0."Project" = dln1."Project" left join odln dln on dln1."DocEntry" = dln."DocEntry" left join oinv inv on T1."DocEntry" = inv."DocEntry" left JOIN OSLP T2 ON T2."SlpCode" = T1."SlpCode" left join nnm1 on dln."Series" = nnm1."Series" left join oprj prj on T0."Project" = prj."PrjCode" where T0."Project" in (' + req.query.prj + ') and T0."Price" > 0 order by T0."Project"';

  connection.runQuery(res, sql);
};

exports.bastINS = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select * from oprj where "PrjCode" LIKE  ' + "'%" + req.query.code + "%'" + ' and "U_ContactCode" is not null and "U_Status" != '+ "'D'" +' order by oprj."PrjCode"';
  // var sql = 'select * from oprj limit 5';

  connection.runQuery(res, sql);
};

exports.bastMNT = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  // var sql = 'select * from octr where "ContractID" LIKE  ' + "'%" + req.query.code + "%'" + ' order by octr."ContractID" DESC limit 20';
  var sql = 'select * from octr Where "ContractID" LIKE ' + "'%"  + req.query.code + "%'" + ' order by octr."ContractID"';

  connection.runQuery(res, sql);
};

exports.bastDO = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  // var sql = 'select * from octr where "ContractID" LIKE  ' + "'%" + req.query.code + "%'" + ' order by octr."ContractID" DESC limit 20';
  var sql = 'select * from odln Where "DocNum" LIKE ' + "'%" + req.query.code + "%'" + ' order by odln."DocNum"';

  connection.runQuery(res, sql);
};

exports.bastCM = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  // var sql = 'select * from octr where "ContractID" LIKE  ' + "'%" + req.query.code + "%'" + ' order by octr."ContractID" DESC limit 20';
var sql =  'select * from ordr where "DocNum" LIKE ' + "'%"  + req.query.code + "%'" + ' order by ordr."DocNum"';

  connection.runQuery(res, sql);
};
exports.CMitems = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  // var sql = 'select * from octr where "ContractID" LIKE  ' + "'%" + req.query.code + "%'" + ' order by octr."ContractID" DESC limit 20';
var sql =  'SELECT T1."DocNum" as "SODocNum", left(T1."DocDate", 10) as "SO Date", T1."CardName" as "Customer",T1."NumAtCard" as "PO",T1."CardCode" as "CustomerCode", T0."ItemCode" as "ItemCode", T0."Dscription" as "ItemName", T0."Quantity",T0."Price", T0."LineTotal", T1."U_VIT_TOPY", dln."DocNum" as "Delivery No", dln."U_VIT_NPAN" as "Delivery Address", left(dln."DocDate", 10) as "DeliveryDate",	dln."U_VIT_DIOL" as "Receiver" ,dln."Series" as "Series", T0."SerialNum" as "SerialNumber" FROM RDR1 T0 JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry" left join dln1 dln1 on T0."DocEntry" = dln1."BaseEntry" and T0."LineNum" = dln1."BaseLine" and T0."Project" = dln1."Project" left join odln dln on dln1."DocEntry" = dln."DocEntry" where T1."DocNum" in (' + req.query.docnum + ') order by T1."DocNum"';

  connection.runQuery(res, sql);
};
exports.CM = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  // var sql = 'select * from octr where "ContractID" LIKE  ' + "'%" + req.query.code + "%'" + ' order by octr."ContractID" DESC limit 20';
var sql =  'SELECT  T1."DocNum" as "SODocNum", left(T1."DocDate", 10) as "SO Date", T1."CardName" as "Customer",T1."NumAtCard" as "PO", T1."CardCode" as "CustomerCode", T0."ItemCode" as "ItemCode", T0."Dscription" as "ItemName", T0."Quantity",T0."Price", T0."LineTotal", T1."U_VIT_TOPY", dln."DocNum" as "Delivery No", dln."U_VIT_NPAN" as "Delivery Address", left(dln."DocDate", 10) as "DeliveryDate",	dln."U_VIT_DIOL" as "Receiver" , T0."SerialNum" as "SerialNumber" FROM RDR1 T0 JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry" left join dln1 dln1 on T0."DocEntry" = dln1."BaseEntry" and T0."LineNum" = dln1."BaseLine" and T0."Project" = dln1."Project" left join odln dln on dln1."DocEntry" = dln."DocEntry" where T1."DocNum" = ' + req.query.docnum + '';

  connection.runQuery(res, sql);
};
exports.addwarranty = function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

var sql =  'select   A."DistNumber",   A."ItemCode",   A."itemName",   SUBSTRING(Y."DocDate", 1, 10) as "DoDate",   Y."DocNum" as "NoDO",   SUBSTRING(F."DocDate", 1, 10) as "SoDate",   F."DocNum" as "NoSO",   Y."U_VIT_WGSA" as "Warranty-SparePart",   Y."U_VIT_WGBA" as "Warranty-Battery" from   OSRN A   INNER JOIN ITL1 B ON A."ItemCode" = B."ItemCode"   AND A."SysNumber" = B."SysNumber"   INNER JOIN OITL C ON B."LogEntry" = C."LogEntry"   INNER JOIN odln Y on C."DocType" = Y."ObjType"   AND C."DocEntry" = Y."DocEntry"   INNER JOIN dln1 X on X."DocEntry" = Y."DocEntry"   AND C."DocLine" = X."LineNum"   INNER JOIN rdr1 Z on X."BaseEntry" = Z."DocEntry"   INNER JOIN ordr F on Z."DocEntry" = F."DocEntry" where   X."Project" = ' + "'" + req.query.prj + "'" + '';

  connection.runQuery(res, sql);
}

exports.itemmonitoring = function (req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true);

  var sql = 'SELECT   distinct T0."Project" as "PrjCode",   T1."DocNum" as "SO DocNum",   oinv."DocStatus" as "Invoice Status",   left(T1."DocDate", 10) as "SO Date",   T2."SlpName" as "SalesPerson",   T1."CardName" as "Customer",   T1."NumAtCard" as "PO",   T0."ItemCode" as "ItemCode",   prj."U_Status" as "Status",  prj."U_StartDate" as "U_StartDate",  case T1."DocType" when ' + "' " + 'I' + " '" + ' then T0."Dscription" else case when length(T0."Dscription") > coalesce(    length(T0.u_vit_ft),     0  ) then T0."Dscription" else TO_VARCHAR(T0.U_VIT_FT) end end as "ItemName",   case T1."DocType" when ' + "' " + 'I' + " '" + ' then T0."Quantity" else T0."U_VIT_QT" end as "Quantity",   T0."Price",   T0."LineTotal",   T1."U_VIT_TOPY",   dln."DocNum" as "Delivery",   left(dln."DocDueDate", 10) as "DeliveryDate",   dln."U_VIT_DIOL" as "Receiver" FROM   RDR1 T0   JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry"   left join dln1 dln1 on T0."DocEntry" = dln1."BaseEntry"   and T0."LineNum" = dln1."BaseLine"   and T0."Project" = dln1."Project"   left join odln dln on dln1."DocEntry" = dln."DocEntry"   left join oprj prj on T0."Project" = prj."PrjCode"   left join inv1 inv1 on prj."PrjCode" = inv1."Project"   left join oinv oinv on inv1."DocEntry" = oinv."DocEntry"   left JOIN OSLP T2 ON T2."SlpCode" = T1."SlpCode" where  T0."Price" != 0 and T0."Project" != '+ "' '" +' and SUBSTRING(prj."U_StartDate", 1, 10) BETWEEN ' + "'" + req.body.year + "'" + ' AND  ' + "'" + req.body.yer + "'" + ' and prj."U_Status" in ('+ req.body.status +') order by   T0."Project"';

  connection.runQuery(res, sql);
}
