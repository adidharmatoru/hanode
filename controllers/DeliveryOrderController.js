'use strict';

const connection = require('../config/database/conn');

// start function
exports.index = function(req, res) {
  var docnum = req.query.docnum || "'%'";
  var sql = 'select * from odln limit 1'

  connection.runQuery(res, sql);
};

exports.close = function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select "DocEntry", "DocNum" from odln where "DocStatus" = ' + "'" + 'O' + "'" + ' and "DocNum" in  (' + req.query.code + ')';

  connection.runQuery(res, sql);
};

exports.findDocEntry = function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select "DocEntry" from odln where "DocNum" in  (' + req.query.code + ')';

  connection.runQuery(res, sql);
};

exports.trackingserialNumber = function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); //

    var sql = 'select	A."ItemCode" as "ItemCode",	A."itemName",	A."DistNumber" as "Serial Number",	D."Name" AS "Doc Type",	C."DocNum" as "Nomor Documen",SUBSTRING(C."DocDate",1,10) as "Posting Date",	C."CardCode",	C."CardName" as "BP Name",	CASE WHEN C."DocQty" < 0 THEN ' + "'" + "OUT" + "'" + ' ELSE ' + "'" + "IN" + "'" + ' END AS "MutationType",	E."WhsCode" as "Warehouse Code",	F."U_VIT_WGSA" as "Warranty-SparePart",	F."U_VIT_WGBA" as "Warranty-Battery",A."MnfDate" as "Mfr End Date Batt",A."GrntExp" as "Mfr Warranty End UPS",A."Notes" from OSRN A INNER JOIN ITL1 B ON A."ItemCode" = B."ItemCode" AND A."SysNumber" = B."SysNumber"INNER JOIN OITL C ON B."LogEntry" = C."LogEntry" INNER JOIN "@VIT_OT" D ON C."DocType" = D."Code" INNER JOIN OWHS E ON C."LocCode" = E."WhsCode" AND C."LocType" = 64 LEFT JOIN (	SELECT	X."LineNum", Y.*	FROM ODLN Y INNER JOIN DLN1 X ON X."DocEntry" = Y."DocEntry") F ON C."DocType" = F."ObjType" AND C."DocEntry" = F."DocEntry" AND C."DocLine" = F."LineNum" WHERE A."DistNumber" =  ' + "'" + req.query.code + "'" + ' ORDER BY C."ItemCode", A."DistNumber",C."LogEntry", C."DocNum"';

  connection.runQuery(res, sql);
};

exports.serialnumber = function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); //

  var sql = 'select "DistNumber", "ItemCode","itemName" from osrn Where "DistNumber" LIKE ' + "'%" + req.query.code + "%'" + ' order by "DistNumber"';

  connection.runQuery(res,sql);
};

exports.cekwarranty = function(req,res)
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql ='select   A."ItemCode" as "ItemCode",   A."itemName",   A."DistNumber" as "Serial Number",   D."Name" AS "Doc Type",   C."DocNum" as "Nomor Documen",   SUBSTRING(C."DocDate", 1, 10) as "PostingDate",   C."CardCode",   C."CardName" as "BP Name",   CASE WHEN C."DocQty" < 0 THEN ' + "' " + " OUT " + " '" + ' ELSE ' + "' " + " IN " + " '" + ' END AS "MutationType",   E."WhsCode" as "Warehouse Code",   F."U_VIT_WGSA" as "WarrantySparePart",   F."U_VIT_WGBA" as "WarrantyBattery",   A."MnfDate" as "Mfr End Date Batt",   A."GrntExp" as "Mfr Warranty End UPS",   A."Notes" from   OSRN A   INNER JOIN ITL1 B ON A."ItemCode" = B."ItemCode"   AND A."SysNumber" = B."SysNumber"   INNER JOIN OITL C ON B."LogEntry" = C."LogEntry"   INNER JOIN "@VIT_OT" D ON C."DocType" = D."Code"   INNER JOIN OWHS E ON C."LocCode" = E."WhsCode"   AND C."LocType" = 64   LEFT JOIN (    SELECT       X."LineNum",       Y.*     FROM       ODLN Y       INNER JOIN DLN1 X ON X."DocEntry" = Y."DocEntry"  ) F ON C."DocType" = F."ObjType"   AND C."DocEntry" = F."DocEntry"   AND C."DocLine" = F."LineNum" WHERE   A."DistNumber" LIKE  ' + "'%" + req.query.code + "%'" + ' and D."Name" = '+ "'Delivery Order'" +' ORDER BY   C."ItemCode",   A."DistNumber",   C."LogEntry",   C."DocNum"';

  connection.runQuery(res, sql);
};

exports.serialNum = function(req, res)
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql ='  select   ns."customer",   ns."custmrName",   ns."instLction",   ns."itemName",   ns."itemCode",   ns."internalSN",   ns."delivery",   ns."deliveryNo",   d1."U_VIT_WGSA" as "WarrantySparePart",   d1."U_VIT_WGBA" as "WarrantyBattery",   SUBSTRING(octr."StartDate",1,10) as "StartDate",  SUBSTRING(octr."EndDate",1,10) as "EndDate",  SUBSTRING(d1."DocDate", 1, 10) as "PostingDate",   pr."CntctCode",   pr."Tel1",   pr."Name",   t1."ContractID",   SUBSTRING(t1."StartDate", 1, 10) as "startdateContract",   SUBSTRING(t1."EndDate", 1, 10) as "enddateContract" from   oins ns   left join ocpr pr on ns."customer" = pr."CardCode"   left join ctr1 t1 on ns."internalSN" = t1."InternalSN"   left join octr on t1."ContractID" = octr."ContractID"  left join odln d1 on ns."delivery" = d1."DocEntry" where   ns."internalSN" LIKE ' + "'%" + req.query.code + "%'" + ' and octr."Status" != ' + "'" + 'T' + "'" + ' and ns."status" = ' + "'" + 'A' + "'" + '';

  connection.runQuery(res, sql);
}
