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

  var sql = 'select * from ordr join nnm1 on ordr."Series" = nnm1."Series" where LENgth(nnm1."SeriesName") = 4 and ordr."DocStatus" = ' + "'" + 'O' + "'" + ' and ordr.CANCELED = ' + "'" + 'N' + "'" + ' and ordr."DocNum" LIKE  ' + "'%" + req.query.code + "%'" + ' order by ordr."DocNum"';
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

  var sql = 'SELECT distinct T0."Project" as "PrjCode", T1."DocNum" as "SO DocNum", oinv."DocStatus" as "Invoice Status",  left(T1."DocDate", 10) as "SO Date",T2."SlpName" as "SalesPerson",T1."CardName" as "Customer",T1."NumAtCard" as "PO",T0."ItemCode" as "ItemCode",case T1."DocType" when ' + "'" + 'I' + "'" + ' then T0."Dscription" else case when length(T0."Dscription") > coalesce(length(T0.u_vit_ft),	0) then T0."Dscription" else TO_VARCHAR(T0.U_VIT_FT) end end as "ItemName", case T1."DocType" when ' + "'" + 'I' + "'" + ' then T0."Quantity" else T0."U_VIT_QT" end as "Quantity",T0."Price",T0."LineTotal", T1."U_VIT_TOPY", dln."DocNum" as "Delivery", left(dln."DocDueDate", 10) as "DeliveryDate",dln."Address" as "Delivery Address2", dln."U_VIT_DIOL" as "Receiver"FROM RDR1 T0 JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry" left join dln1 dln1 on T0."DocEntry" = dln1."BaseEntry" and T0."LineNum" = dln1."BaseLine" and T0."Project" = dln1."Project" left join odln dln on dln1."DocEntry" = dln."DocEntry" left join oprj prj on T0."Project" = prj."PrjCode" left join inv1 inv1 on prj."PrjCode" = inv1."Project" left join oinv oinv on inv1."DocEntry" = oinv."DocEntry" left JOIN OSLP T2 ON T2."SlpCode" = T1."SlpCode" where T0."Project" in (' + req.body.prj + ') and T0."Price" != 0 order by T0."Project"';

  connection.runQuery(res, sql);
};

exports.secondarySoldItems = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  // var sql = 'SELECT distinct T0."Project" as "PrjCode", T1."DocNum" as "SO DocNum", left(T0."DocDate", 10) as "SO Date",T2."SlpName" as "SalesPerson",T1."CardName" as "Customer",T1."NumAtCard" as "PO",T0."ItemCode" as "ItemCode",T0."Dscription" as "ItemName",dln1."Quantity",dln1."Price",T0."LineTotal", T1."U_VIT_TOPY", dln."DocNum" as "Delivery", left(dln."DocDate", 10) as "DeliveryDate", dln."U_VIT_DIOL" as "Receiver"FROM RDR1 T0 JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry" left join dln1 dln1 on T0."Dscription" = dln1."Dscription" and T0."Project" = dln1."Project" left join odln dln on dln1."DocEntry" = dln."DocEntry" left join oinv inv on T1."DocEntry" = inv."DocEntry" left JOIN OSLP T2 ON T2."SlpCode" = T1."SlpCode" left join oprj prj on T0."Project" = prj."PrjCode" where T0."Project" is not null and T0."Project" != ' + "'" + "'" +' and (T0."Dscription" NOT LIKE  ' + "'%EATON" + "%'" + ' or T0."Dscription" NOT LIKE  ' + "'%LKPP" + "%'" + 'or T0."Dscription" NOT LIKE  ' + "'%PENGIRIMAN" + "%'" + 'or T0."Dscription" NOT LIKE  ' + "'%PANEL" + "%'" + ') and left(prj."U_StartDate", 4) = year(CURRENT_DATE) and dln."CANCELED" != ' + "'Y" + "'" +'order by T0."Project"';

  var sql = 'SELECT distinct T0."Project" as "PrjCode", T1."DocNum" as "SO DocNum", left(T1."DocDate", 10) as "SO Date",T2."SlpName" as "SalesPerson",dln."Address" as "Delivery Address",T1."CardName" as "Customer",T1."NumAtCard" as "PO",T0."ItemCode" as "ItemCode",T0."Dscription" as "ItemName",T0."Quantity",T0."Price",T0."LineTotal", T1."U_VIT_TOPY", dln."DocNum" as "Delivery", left(dln."DocDate", 10) as "DeliveryDate", dln."U_VIT_DIOL" as "Receiver"FROM RDR1 T0 JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry" left join dln1 dln1 on T0."DocEntry" = dln1."BaseEntry" and T0."LineNum" = dln1."BaseLine" and T0."Project" = dln1."Project" left join odln dln on dln1."DocEntry" = dln."DocEntry" left join oinv inv on T1."DocEntry" = inv."DocEntry" left JOIN OSLP T2 ON T2."SlpCode" = T1."SlpCode" left join oprj prj on T0."Project" = prj."PrjCode" where T0."Project" in (' + req.body.prj + ') and T0."Price" = 0 order by T0."Project"';

  connection.runQuery(res, sql);
};

exports.primarySoldItems1 = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  // var sql = 'SELECT distinct T0."Project" as "PrjCode", T1."DocNum" as "SO DocNum", left(T0."DocDate", 10) as "SO Date",T2."SlpName" as "SalesPerson",T1."CardName" as "Customer",T1."NumAtCard" as "PO",T0."ItemCode" as "ItemCode",T0."Dscription" as "ItemName",dln1."Quantity",dln1."Price",T0."LineTotal", T1."U_VIT_TOPY", dln."DocNum" as "Delivery", left(dln."DocDate", 10) as "DeliveryDate", dln."U_VIT_DIOL" as "Receiver"FROM RDR1 T0 JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry" left join dln1 dln1 on T0."Dscription" = dln1."Dscription" and T0."Project" = dln1."Project" left join odln dln on dln1."DocEntry" = dln."DocEntry" left join oinv inv on T1."DocEntry" = inv."DocEntry" left JOIN OSLP T2 ON T2."SlpCode" = T1."SlpCode" left join oprj prj on T0."Project" = prj."PrjCode" where T0."Project" is not null and T0."Project" != ' + "'" + "'" +' and (T0."Dscription" LIKE  ' + "'%EATON" + "%'" + ' or T0."Dscription" LIKE  ' + "'%LKPP" + "%'" + ' or T0."Dscription" LIKE  ' + "'%PENGIRIMAN" + "%'" + ' or T0."Dscription" LIKE  ' + "'%PANEL" + "%'" + ') and year(left(prj."U_StartDate", 4)) = year(CURRENT_DATE) and dln."CANCELED" != ' + "'Y" + "'" +' order by T0."Project"';

  var sql = 'SELECT T0."Project" as "PrjCode", T1."DocNum" as "SODocNum",dln."U_VIT_WGSE" as "WarrantyService",T1."U_VIT_WGSE" as "WarrantyServiceSO",left(T1."DocDate", 10) as "SO Date",T2."SlpName" as "SalesPerson",T1."CardCode" as "CardCode",T1."CardName" as "Customer",T1."NumAtCard" as "PO",T0."ItemCode" as "ItemCode",T0."Dscription" as "ItemName",T0."Quantity",T0."Price",T0."LineTotal",T1."U_VIT_TOPY",nnm1."BeginStr" || '+ "'-'" +' || dln."DocNum" as "Delivery No", dln."U_VIT_NPAN" as "Delivery Address",   dln."Address" as "Delivery Address2",   left(dln."DocDate", 10) as "DeliveryDate", left(dln."DocDueDate", 10) as "DocDueDate",   dln."U_VIT_DIOL" as "Receiver",   T0."SerialNum" as "SerialNumber",   T1."CardCode" as "CardCode",   IFNULL(cnt."Tel1", cnt."Tel2") as "ContactTel",   osrn."DistNumber" as "SerialNum",   O1."instLction" as "location",  cnt."CntctCode" as "contactCode" FROM   RDR1 T0   JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry"   left join dln1 dln1 on T0."DocEntry" = dln1."BaseEntry"   and T0."LineNum" = dln1."BaseLine"   and T0."Project" = dln1."Project"   left outer join SRI1 I1 on dln1."ItemCode" = I1."ItemCode"   and (dln1."DocEntry" = I1."BaseEntry"  and dln1."ObjType" = I1."BaseType" ) left outer join OSRN osrn on osrn."ItemCode" = I1."ItemCode"   and I1."SysSerial" = osrn."SysNumber"   left join oins O1 on osrn."DistNumber" = O1."internalSN" and O1."status" = '+ "'A'" +'  left join odln dln on dln1."DocEntry" = dln."DocEntry"   left join oinv inv on T1."DocEntry" = inv."DocEntry"   left JOIN OSLP T2 ON T2."SlpCode" = T1."SlpCode"   left join nnm1 on dln."Series" = nnm1."Series"   left join oprj prj on T0."Project" = prj."PrjCode"   left join ocpr cnt on dln."CntctCode" = cnt."CntctCode" where T0."Project" in (' + req.query.prj + ') and dln."U_VIT_WGSE" is not null and dln."CANCELED" = '+ "'N'" +' or T0."Project" in (' + req.query.prj + ') and T1."U_VIT_WGSE" is not null and dln."CANCELED" = '+ "'N'" +' order by T0."Project"';

  connection.runQuery(res, sql);
};

exports.primarySoldItems2 = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  // var sql = 'SELECT distinct T0."Project" as "PrjCode", T1."DocNum" as "SO DocNum", left(T0."DocDate", 10) as "SO Date",T2."SlpName" as "SalesPerson",T1."CardName" as "Customer",T1."NumAtCard" as "PO",T0."ItemCode" as "ItemCode",T0."Dscription" as "ItemName",dln1."Quantity",dln1."Price",T0."LineTotal", T1."U_VIT_TOPY", dln."DocNum" as "Delivery", left(dln."DocDate", 10) as "DeliveryDate", dln."U_VIT_DIOL" as "Receiver"FROM RDR1 T0 JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry" left join dln1 dln1 on T0."Dscription" = dln1."Dscription" and T0."Project" = dln1."Project" left join odln dln on dln1."DocEntry" = dln."DocEntry" left join oinv inv on T1."DocEntry" = inv."DocEntry" left JOIN OSLP T2 ON T2."SlpCode" = T1."SlpCode" left join oprj prj on T0."Project" = prj."PrjCode" where T0."Project" is not null and T0."Project" != ' + "'" + "'" +' and (T0."Dscription" LIKE  ' + "'%EATON" + "%'" + ' or T0."Dscription" LIKE  ' + "'%LKPP" + "%'" + ' or T0."Dscription" LIKE  ' + "'%PENGIRIMAN" + "%'" + ' or T0."Dscription" LIKE  ' + "'%PANEL" + "%'" + ') and year(left(prj."U_StartDate", 4)) = year(CURRENT_DATE) and dln."CANCELED" != ' + "'Y" + "'" +' order by T0."Project"';

  var sql = 'SELECT distinct T0."Project" as "PrjCode", T1."DocNum" as "SO DocNum", oinv."DocStatus" as "Invoice Status",  left(T1."DocDate", 10) as "SO Date",T2."SlpName" as "SalesPerson",T1."CardName" as "Customer",T1."NumAtCard" as "PO",T0."ItemCode" as "ItemCode",case T1."DocType" when ' + "'" + 'I' + "'" + ' then T0."Dscription" else case when length(T0."Dscription") > coalesce(length(T0.u_vit_ft),	0) then T0."Dscription" else TO_VARCHAR(T0.U_VIT_FT) end end as "ItemName", case T1."DocType" when ' + "'" + 'I' + "'" + ' then T0."Quantity" else T0."U_VIT_QT" end as "Quantity",T0."Price",T0."LineTotal", T1."U_VIT_TOPY", dln."DocNum" as "Delivery", left(dln."DocDueDate", 10) as "DeliveryDate",dln."Address" as "Delivery Address2", dln."U_VIT_DIOL" as "Receiver", oinv."DocTotal" as "inv_total", T1."DocTotal" as "so_total", oinv."DocNum" as "DocNum_INV", ct1."DocNum" as "DocNum_incoming", ct2."SumApplied" as "jumlah_incoming" FROM RDR1 T0 JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry" left join dln1 dln1 on T0."DocEntry" = dln1."BaseEntry" and T0."LineNum" = dln1."BaseLine" and T0."Project" = dln1."Project" left join odln dln on dln1."DocEntry" = dln."DocEntry" left join oprj prj on T0."Project" = prj."PrjCode" left join inv1 inv1 on prj."PrjCode" = inv1."Project" left join oinv oinv on inv1."DocEntry" = oinv."DocEntry" left join rct2 ct2 on oinv."DocEntry" = ct2."DocEntry" left join orct ct1 on ct2."DocNum" = ct1."DocEntry" left JOIN OSLP T2 ON T2."SlpCode" = T1."SlpCode" where T0."Project" in (' + req.body.prj + ') and T0."Price" != 0 order by T0."Project"';

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

var sql =  'select distinct  A."DistNumber",   A."ItemCode",   A."itemName",   SUBSTRING(Y."DocDate", 1, 10) as "DoDate",   Y."DocNum" as "NoDO",   SUBSTRING(F."DocDate", 1, 10) as "SoDate",   F."DocNum" as "NoSO",   Y."U_VIT_WGSA" as "Warranty-SparePart",   Y."U_VIT_WGBA" as "Warranty-Battery" from   OSRN A   INNER JOIN ITL1 B ON A."ItemCode" = B."ItemCode"   AND A."SysNumber" = B."SysNumber"   INNER JOIN OITL C ON B."LogEntry" = C."LogEntry"   INNER JOIN odln Y on C."DocType" = Y."ObjType"   AND C."DocEntry" = Y."DocEntry"   INNER JOIN dln1 X on X."DocEntry" = Y."DocEntry"   AND C."DocLine" = X."LineNum"   INNER JOIN rdr1 Z on X."BaseEntry" = Z."DocEntry"   INNER JOIN ordr F on Z."DocEntry" = F."DocEntry" where   X."Project" = ' + "'" + req.query.prj + "'" + ' and A."ItemCode" NOT LIKE ' + "'" + '%CLOSE RACK CUSTOM CT%' + "'" + '';

  connection.runQuery(res, sql);
}

exports.itemmonitoring = function (req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true);

  var sql = 'SELECT    distinct T0."Project" as "PrjCode", prj."PrjName" as "PrjName", 	left(T1."DocDate", 10) as "SO Date", T2."SlpName" as "SalesPerson", T1."CardName" as "Customer", S1."SlpName" as "SalesName", T1."NumAtCard" as "PO", prj."U_Status" as "Status", prj."U_StartDate" as "U_StartDate", oinv."DocStatus" as "Invoice Status", T1."U_VIT_TOPY", dln."DocNum" as "Delivery", left(dln."DocDueDate", 10) as "DeliveryDate", dln."Address" as "AlamatPengiriman", dln1."ItemCode" as "ItemCodeDO", dln1."Dscription" as "ItemNameDO", dln1."Quantity" as "QuantityDO", dln."U_VIT_DIOL" as "Receiver",T1."DocNum" as "DocNumSO" FROM   RDR1 T0   JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry" left join oslp S1 on T1."SlpCode" = S1."SlpCode"  left join dln1 dln1 on T0."Project" = dln1."Project"   left join odln dln on dln1."DocEntry" = dln."DocEntry"   left join oprj prj on T0."Project" = prj."PrjCode"   left join inv1 inv1 on prj."PrjCode" = inv1."Project"     left join oinv oinv on inv1."DocEntry" = oinv."DocEntry"   left JOIN OSLP T2 ON T2."SlpCode" = T1."SlpCode" where  T0."Price" != 0 and T0."Project" != '+ "' '" +' and SUBSTRING(prj."U_StartDate", 1, 10) BETWEEN ' + "'" + req.body.year + "'" + ' AND  ' + "'" + req.body.yer + "'" + ' and prj."U_Status" in ('+ req.body.status +') and NOT dln1."ItemCode"= ' + "'" + 'IM' + "'" + ' AND NOT dln1."ItemCode" =' + "'" + 'IC' + "'" + ' AND NOT dln1."ItemCode" =' + "'" + 'SC' + "'" + ' or T0."Price" != 0 and T0."Project" != '+ "' '" +' and prj."U_Status" in ('+ req.body.status +') and SUBSTRING(prj."U_StartDate", 1, 10) BETWEEN ' + "'" + req.body.year + "'" + ' AND  ' + "'" + req.body.yer + "'" + ' and NOT dln1."ItemCode"= ' + "'" + 'IM' + "'" + ' AND NOT dln1."ItemCode" =' + "'" + 'IC' + "'" + ' AND NOT dln1."ItemCode" =' + "'" + 'SC' + "'" + ' order by T0."Project"';

  connection.runQuery(res, sql);
}

exports.itemmonitoringPO = function (req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true);

  var sql = 'SELECT   distinct T0."Project" as "PrjCode",   left(T1."DocDate", 10) as "SO Date",   T2."SlpName" as "SalesPerson",   T1."CardName" as "Customer",   S1."SlpName" as "SalesName",   T1."NumAtCard" as "PO",   prj."U_Status" as "Status",   T1."DocNum" as "DocNumSO",  Q1."DocEntry",  Q1."Dscription" as "ItemName",  Q1."Quantity" as "Qty",  Q2."DocNum" as "No_PR",  left(Q2."CreateDate", 10) as "PR_Date",  Q2."DocStatus"FROM   RDR1 T0   JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry"   left join oslp S1 on T1."SlpCode" = S1."SlpCode"   left join dln1 dln1 on T0."Project" = dln1."Project"   left join odln dln on dln1."DocEntry" = dln."DocEntry"   left join oprj prj on T0."Project" = prj."PrjCode"   left JOIN OSLP T2 ON T2."SlpCode" = T1."SlpCode"   left join prq1 Q1 on T0."Project" = Q1."Project"  left join oprq Q2 on Q1."DocEntry" = Q2."DocEntry" where  T0."Price" != 0 and T0."Project" != '+ "' '" +' and SUBSTRING(prj."U_StartDate", 1, 10) BETWEEN ' + "'" + req.body.year + "'" + ' AND  ' + "'" + req.body.yer + "'" + ' and prj."U_Status" in ('+ req.body.status +') or T0."Price" != 0 and T0."Project" != '+ "' '" +' and prj."U_Status" in ('+ req.body.status +') and SUBSTRING(prj."U_StartDate", 1, 10) BETWEEN ' + "'" + req.body.year + "'" + ' AND  ' + "'" + req.body.yer + "'" + ' order by T0."Project"';

  connection.runQuery(res, sql);
}

exports.monitoring = function (req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true);

  var sql = 'SELECT   distinct T0."Project" as "PrjCode",   prj."PrjName" as "PrjName",   left(T1."DocDate", 10) as "SO Date",   T1."CardName" as "Customer",   T1."NumAtCard" as "PO",   prj."U_Status" as "Status",   prj."U_StartDate" as "U_StartDate",    T1."U_VIT_TOPY",   dln."DocNum" as "Delivery",   left(dln."DocDueDate", 10) as "DeliveryDate",   dln."Address" as "AlamatPengiriman",   dln1."ItemCode" as "ItemCodeDO",   dln1."Dscription" as "ItemNameDO",   dln1."Quantity" as "QuantityDO",  oins."internalSN" as "SerialNumber",  oins."insID" from RDR1 T0   JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry"   left join dln1 dln1 on T0."TrgetEntry" = dln1."DocEntry"  inner join OITL on dln1."DocEntry" = OITL."ApplyEntry" and dln1."LineNum" = OITL."ApplyLine" and OITL."ApplyType" = ' + "'" + '15' + "'" + '  inner join ITL1 on OITL."LogEntry" = ITL1."LogEntry"  inner join OSRN on ITL1."ItemCode"=osrn."ItemCode" and ITL1."MdAbsEntry" = OSRN."AbsEntry"   inner join oins on osrn."DistNumber"=oins."internalSN" and oins."status"=' + "'" + 'A' + "'" + '   left join odln dln on dln1."DocEntry" = dln."DocEntry"   left join oprj prj on T0."Project" = prj."PrjCode"  where  T0."Price" != 0 and T0."Project" != '+ "' '" +' and SUBSTRING(prj."U_StartDate", 1, 10) BETWEEN ' + "'" + req.body.year + "'" + ' AND  ' + "'" + req.body.yer + "'" + ' and prj."U_Status" in ('+ req.body.status +') and NOT dln1."ItemCode"= ' + "'" + 'IM' + "'" + ' AND NOT dln1."ItemCode" =' + "'" + 'IC' + "'" + ' AND NOT dln1."ItemCode" =' + "'" + 'SC' + "'" + ' AND NOT dln1."ItemCode" =' + "'" + 'KG' + "'" + ' AND dln1."OcrCode"=' + "'" + 'UPS' + "'" + ' or T0."Price" != 0 and T0."Project" != '+ "' '" +' and prj."U_Status" in ('+ req.body.status +') and SUBSTRING(prj."U_StartDate", 1, 10) BETWEEN ' + "'" + req.body.year + "'" + ' AND  ' + "'" + req.body.yer + "'" + ' and NOT dln1."ItemCode"= ' + "'" + 'IM' + "'" + ' AND NOT dln1."ItemCode" =' + "'" + 'IC' + "'" + ' AND NOT dln1."ItemCode" =' + "'" + 'SC' + "'" + ' AND NOT dln1."ItemCode" =' + "'" + 'KG' + "'" + ' AND dln1."OcrCode"=' + "'" + 'UPS' + "'" + ' order by T0."Project"';

  connection.runQuery(res, sql);
}

exports.scall = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'SELECT   T0."contractID" as "ContractNo",   T0."subject" as "Subject",   T0."BPShipAddr" as "address",   T0."itemName" as "ItemName",   T0."itemCode" as "ItemCode",   T0."internalSN" as "internalSN",   T0."U_VIT_NOSO" as "No SO",   T0."Telephone" as "tlpn",   T0."callID" as "SC_no", SUBSTRING(T0."createDate", 1, 10) as "SC_date", SUBSTRING(T0."closeDate", 1, 10) as "SC_closedate",   SUBSTRING(T0."cntrctDate", 1, 10) as "ContractDate",   T0."DocNum" as "DocNum",   T5."Name" as "ContactName",   SUBSTRING(T0."closeDate", 1, 10) as "SC_enddate",   T4."SeriesName" as "SeriesName",   T0."U_KS_REMARK" as "Remark",   T0."Location" as "Location",   T0."custmrName" as "Name"FROM   OSCL T0   left join scl1 T2 ON T0."callID" = T2."srvcCallID"   left join nnm1 T4 on T0."Series" = T4."Series"   left join ocpr T5 on T5."CntctCode" = T0."contctCode"  where SUBSTRING(T0."createDate", 1, 4) in (2024,2023,2022) and T4."SeriesName" LIKE ' + "'" + '%SCINST%' + "'" + '  order by   T0."DocNum" desc';

  connection.runQuery(res, sql);
};

exports.ascl = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select "callID","subject",SUBSTRING("createDate", 1, 10) AS "createDate",SUBSTRING("updateDate", 1, 10) AS "updateDate" from ascl where "callID"= ' + "'" + req.query.code + "'" + '';

  connection.runQuery(res, sql);
};


exports.budgetingDraftPO = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select distinct  RF."DocNum",  RF."DocEntry",  RF."DocTotal",  RF3."PrjCode",  RF."WddStatus"from   odrf RF   left join por1 RF1 on RF."DocEntry" = RF1."DocEntry"   left join oprj RF3 on RF1."Project" = RF3."PrjCode" where   RF3."U_Status" != ' + "'" + 'D' + "'" + '   and RF."DocStatus" != ' + "'" + 'C' + "'" + '   and RF."WddStatus" != ' + "'" + 'N' + "'" + '  and RF."DocTotal" != 0 order by RF3."PrjCode"';

  connection.runQuery(res, sql);
};

exports.budgetingPO = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select distinct  OP."DocNum",  OP2."PrjCode",  OP."DocTotal"from   opor OP   left join por1 OP1 on OP."DocEntry" = OP1."DocEntry"   left join oprj OP2 on OP1."Project" = OP2."PrjCode" where   OP2."U_Status" != ' + "'" + 'D' + "'" + ' and OP."DocStatus" != ' + "'" + 'C' + "'" + '  and OP."DocTotal" != 0 order by OP2."PrjCode"';

  connection.runQuery(res, sql);
};

exports.budgetingOP = function(req,res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select    	P1."DocNum" ,   	P1."Series",   	P1."DocTotal",   	P1."PrjCode"   from    	ovpm P1    	join oprj P2 on P1."PrjCode" = P2."PrjCode"   	order by P1."DocNum" desc'
  connection.runQuery(res, sql);
}

exports.PriceSO = function(req,res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'SELECT   distinct T0."Project" as "PrjCode",   T1."DocNum" as "SO DocNum",   left(T1."DocDate", 10) as "SO Date",   T2."SlpName" as "SalesPerson",   T1."CardName" as "Customer",   T1."NumAtCard" as "PO",   T0."ItemCode" as "ItemCode",   T0."Dscription" as "ItemName",   T0."Quantity",   T0."Price",   T0."LineTotal",  T1."DocTotal",   T1."U_VIT_TOPY",   dln."DocNum" as "Delivery",   left(dln."DocDate", 10) as "DeliveryDate",   dln."U_VIT_DIOL" as "Receiver" FROM   RDR1 T0   JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry"   left join dln1 dln1 on T0."DocEntry" = dln1."BaseEntry"   and T0."LineNum" = dln1."BaseLine"   and T0."Project" = dln1."Project"   left join odln dln on dln1."DocEntry" = dln."DocEntry"   left join oinv inv on T1."DocEntry" = inv."DocEntry"   left JOIN OSLP T2 ON T2."SlpCode" = T1."SlpCode"   left join oprj prj on T0."Project" = prj."PrjCode" where   prj."PrjCode" = ' + "'" + req.body.code + "'" + ' and T0."Dscription" NOT like ' + "'" + 'EATON%' + "'" + ' and T0."Dscription" NOT like ' + "'" + 'BATTERY%' + "'" + ' and T0."Dscription" NOT like ' + "'" + 'RACK%' + "'" + ' and prj."U_Status" != ' + "'" + 'D' + "'" + ' and T1."OwnerCode" in (461,467) and T0."Price" = 0 order by   T0."Project" desc';

  connection.runQuery(res, sql);
}

exports.projectwithso = function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select distinct prj."PrjCode" as "ProjectCode",rdr."DocNum",rdr."CardName" as "cardname",rdr."NumAtCard" as "NumAtCard", rdr."DocTotal" from oprj prj join rdr1 rdr1 on rdr1."Project" = prj."PrjCode" join ordr rdr on rdr1."DocEntry" = rdr."DocEntry" where "PrjCode" = ' + "'" + req.body.code + "'" + '';

  connection.runQuery(res, sql);
}

exports.projectrental = function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'SELECT  	distinct  T4."DocNum",   T4."DocDate",   T4."CardCode",   T4."CardName",   T4."Filler",   T3."ItemCode",   T3."Dscription",   CASE When T2."AbsEntry" is null Then T3."Quantity" ELSE 1 END QTY,   T3."WhsCode",   T2."DistNumber",  T4."JrnlMemo"FROM   OITL T0   INNER JOIN ITL1 T1 ON T0."LogEntry" = T1."LogEntry"  left outer JOIN OSRN T2 on T1."MdAbsEntry" = T2."AbsEntry"   INNER JOIN OWTR T4 ON T0."DocEntry" = T4."DocEntry"  INNER JOIN WTR1 T3 ON T3."DocEntry" = T4."DocEntry"  inner join nnm1 T5 ON T4."Series" = T5."Series"WHERE    T0."DocType" = 67 and T4."ToWhsCode" = ' + "'" + 'RENTAL' + "'" + ' and T5."SeriesName" in ('+ req.body.series +')';

  connection.runQuery(res, sql);
}

exports.salesname = function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select   r1."SlpCode",   r3."SlpName",   r1."OwnerCode",  r4."lastName" , r4."firstName" from   ordr r1   join rdr1 r2 on r1."DocEntry" = r2."DocEntry"   left join oslp r3 on r1."SlpCode" = r3."SlpCode"  left join ohem r4 on r1."OwnerCode"=r4."empID"where r2."Project" =   ' + "'" + req.query.code + "'" + '';

  connection.runQuery(res, sql);
}

exports.profitandlossitm = function(req,res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select t1."ItemCode", t2."ItmsGrpNam" from oitm t1 join oitb t2 on t1."ItmsGrpCod" = t2."ItmsGrpCod" where t2."ItmsGrpNam" in (' + "'EATON SINGLE PHASE'" + ',' + "'EATON THREE PHASE'" + ',' + "'CHANNEL SINGLE PHASE'" + ',' + "'CHANNEL THREE PHASE'" + ')'

    connection.runQuery(res, sql);
}
