'use strict';

var response = require('../config/res');
var connection = require('../config/database/conn');
var hdbext = require('@sap/hdbext');


exports.masterItems = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select   distinct   oi."ItemName" as "Name",   oi."ItemCode" as "Code",   oi."U_DM_CAPACITY" as "Capacity",   oi."U_DM_VOLTAGE" as "Voltage",   oi."U_DM_PHASE" as "Phase",   oi."U_DM_TYPE" as "Type",   oi."U_DM_MODEL" as "Model",   oi."U_DM_STATUS" as "Status",   oi."U_DM_BATTERY" as "Battery",   oi."U_DM_COO" as "Coo",   oi."U_DM_MEASUREMENT" as "Measurement",   oi."ItmsGrpCod",  t1."Price" from   oitm oi left join itm1 t1 on t1."ItemCode" = oi."ItemCode" where "ItmsGrpCod" in (' + req.query.ItmsGrpNam + ')';
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

exports.ecValidasi = function(req,res,next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'select distinct a."insID" as "idEC", a."custmrName" as "Customer Name", a."internalSN" as "Serial Number", SUBSTRING(b."DocDate",1,10) as "Start Warranty", a."wrrntyEnd" as "End Warranty", a."itemCode" as "Item Code", a."itemName" as "Item Name", a."instLction" as "Location" from oins a left join dln1 b on a."delivery"=b."DocEntry"where "status" = ' + "'" + 'A' + "'" + ' order by "insID" desc';
  connection.runQuery(res, sql);
}

exports.ecDetail = function(req,res,next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'select oins."insID" as "idEC",oins."customer" as "cardCust", oins."custmrName" as "Customer Name","internalSN" as "Serial Number",oins."wrrntyStrt" as "Start Warranty",oins."wrrntyEnd" as "End Warranty",oins."itemCode" as "Item Code",oins."itemName" as "Item Name",oins."instLction" as "Location",SUBSTRING(oins."createDate",1,10) as "createDate",SUBSTRING(oins."dlvryDate",1,10) as "delivery Date",oins."deliveryNo" as "deliveryNo",oins."street" as "street",oins."status" as "Status", oins."block" as "block",oins."zip" as "zip",oins."city" as "city",oins."country" as "country",oins."county" as "county",oins."state" as "state", odln."U_VIT_WGSA" as "WarrantySparePart",   odln."U_VIT_WGBA" as "WarrantyBattery", odln."U_VIT_WGSE" as "WarrantyService"  from oins left join odln on oins."delivery" = odln."DocEntry"  where oins."internalSN" =' + "'" + req.query.code + "'" + '';
  connection.runQuery(res, sql);
}

exports.ecScall = function(req,res,next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'select   C1."callID" AS "callID",   C1."DocNum" as "DocNum",   SUBSTRING(C1."createDate", 1, 10) as "createDate",   C1."subject" as "subject",   AT."AbsEntry" as "AbsEntry",   AT."FileExt" as "FileExt",   AT."FileName" as "FileName",   AT."trgtPath" as "targetPath",  C4."DocAbs",   D1."DocNum" as "DocNumDO",   AT2."AbsEntry" as "AbsEntryDO",   AT2."FileExt" as "FileExtDO",   AT2."FileName" as "FileNameDO",   AT2."trgtPath" as "targetPathDO"from   oscl C1   left join ATC1 AT on AT."AbsEntry" = C1."AtcEntry"   left join scl4 C4 on C1."callID" = C4."SrcvCallID"  left join odln D1 on C4."DocAbs" = D1."DocEntry" and C1."customer" = D1."CardCode"  left join ATC1 AT2 on AT2."AbsEntry" = D1."AtcEntry" where   C1."internalSN" =' + "'" + req.query.code + "'" + '';
  connection.runQuery(res, sql);
}

exports.ecScon = function(req,res,next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'select octr."ContractID",SUBSTRING(octr."StartDate", 1,10) AS "StartDate",SUBSTRING(octr."EndDate", 1, 10) as "EndDate",SUBSTRING(octr."TermDate", 1,10) as "TermDate",octr."SrvcType" from octr left join ctr1 on octr."ContractID"=ctr1."ContractID" where ctr1."InternalSN"=' + "'" + req.query.code + "'" + '';
  connection.runQuery(res, sql);
}

exports.ecTransaction = function(req,res,next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'select distinct T0."ItemCode",T2."LogEntry", SUBSTRING(T2."CreateDate",1,10) as "CreateDate",T2."DocNum",SUBSTRING(T2."DocDate",1,10) as "DocDate",T2."LocCode",T2."CardCode",T2."CardName",T2."DocType" from osrn T0 left join itl1 T1 on T0."AbsEntry"=T1."MdAbsEntry" left join oitl T2 on T1."LogEntry"=T2."LogEntry" where T0."DistNumber"=' + "'" + req.query.code + "'" + '';
  connection.runQuery(res, sql);
}

exports.itemsAll = function(req,res,next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'select "ItemCode","ItemName" from oitm where "ItemCode" LIKE  ' + "'%" + req.query.code + "%'" + ' and "validFor" = ' + "'" + 'Y' + "'" + ' OR "ItemName" LIKE  ' + "'%" + req.query.code + "%'" + ' and "validFor" = ' + "'" + 'Y' + "'" + ' order by "ItemName" DESC';
  connection.runQuery(res, sql);
}

exports.itemName = function(req,res,next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'select "ItemCode","ItemName" from oitm where "ItemCode"  =' + "'" + req.query.code + "'" + ' order by "ItemName" DESC';
  connection.runQuery(res, sql);
}

exports.fh_osclvalidation = function(req,res,next){
res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'SELECT "internalSN", "custmrName","status","itemName","insID"  FROM oins where "status"=' + "'" + 'A' + "'" + ' and "internalSN" in (SELECT "internalSN"  FROM oins where "status"=' + "'" + 'A' + "'" + ' GROUP BY "internalSN" HAVING count(*) > 1)'
    connection.runQuery(res, sql);
}

exports.locationwhs = function(req,res,next){
res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'select "WhsCode" as "WarehouseCode", "WhsName" as "WarehouseName","StreetNo"  from owhs'
    connection.runQuery(res, sql);
}

exports.materialbantu = function(req,res,next){
res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'SELECT distinct T0."Project" as "PrjCode",  T0."ItemCode" as "ItemCode", T0."Dscription" as "ItemName",  T0."Quantity",  T0."UomCode",T0."WhsCode",T3."ItmsGrpNam" from RDR1 T0 JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry" left join oitm T2 on T0."ItemCode" = T2."ItemCode" left join oitb T3 on T2."ItmsGrpCod" = T3."ItmsGrpCod" where T0."Price" = 0 AND T0."Project" = ' + "'" + req.query.code + "'" + '  order by T0."Project"'
  connection.runQuery(res, sql);
}

exports.KodeProject = function(req,res,next){
res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'SELECT   distinct T4."PrjCode" as "PrjCode",   T1."NumAtCard" as "Nomor PO",   T1."CardName",   T1."DocNum",   SUBSTRING(T1."CreateDate", 1, 10) as "CreateDate",   SUBSTRING(T1."DocDueDate", 1, 10) as "DocDueDate",   T1."U_VIT_TOPY" as "TOP",   T0."WhsCode",   T5."lastName" as "lastname",   T5."firstName" as "firstName",   T6."SeriesName" as "Series",  T7."SlpName" as "SalesName"  from   RDR1 T0   JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry"   left join oprj T4 on T0."Project" = T4."PrjCode"   left join ohem T5 on T1."OwnerCode" = T5."empID"   left join nnm1 T6 on T1."Series" = T6."Series" left join oslp T7 on T1."SlpCode" = T7."SlpCode" where   T4."PrjCode" is not null   and not "U_Status" in ('+ "'D'" +','+ "'C'" +')   and left(T4."PrjCode", 2) in (' + req.query.year + ')   or SUBSTRING(T4."U_StartDate", 3, 2) in (' + req.query.year + ') order by   T4."PrjCode" desc'
    connection.runQuery(res, sql);
}

exports.itemsProject = function(req,res,next){
res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'SELECT   distinct T4."PrjCode" as "PrjCode",   T0."ItemCode" as "ItemCode",   T0."Dscription" as "ItemName",   T0."Quantity",   T0."UomCode",   T1."NumAtCard" as "Nomor PO",   T1."CardName",   T1."DocNum",   SUBSTRING(T1."CreateDate", 1, 10) as "CreateDate",   SUBSTRING(T1."DocDueDate", 1, 10) as "DocDueDate",   T1."U_VIT_TOPY" as "TOP",   T0."WhsCode",   T3."ItmsGrpNam",   T5."lastName" as "lastname",   T5."firstName" as "firstName",   T6."SeriesName" as "Series" from   RDR1 T0   JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry"   left join oitm T2 on T0."ItemCode" = T2."ItemCode"   left join oitb T3 on T2."ItmsGrpCod" = T3."ItmsGrpCod"   left join oprj T4 on T0."Project" = T4."PrjCode"   left join ohem T5 on T1."OwnerCode" = T5."empID"   left join nnm1 T6 on T1."Series" = T6."Series" where   T4."PrjCode" = ' + "'" + req.query.code + "'" + '  AND NOT T0."ItemCode" = ' + "'" + 'SC' + "'" + '   and not T0."ItemCode" = ' + "'" + 'KG' + "'" + '   and not "U_Status" in ('+ "' D '" +', '+ "' C '" +') order by   T4."PrjCode" desc'
    connection.runQuery(res, sql);
}

exports.listingpengirimanbattery = function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');

  var sql ='select distinct  D1."DocNum" as "DocNumDO",   SUBSTRING(D1."CreateDate",1,10) as "CreateDate",  D3."ItemCode",  D3."Dscription", D3."Quantity",  D1."Series",   D1."CardName" as "CardName",  D2."SeriesName",   R2."DocNum" as "DocNumSO",   R2."NumAtCard",  R2."U_VIT_TOPY",   R2."Series" from   odln D1   join dln1 D3 on D1."DocEntry" = D3."DocEntry"   left join nnm1 D2 on D1."Series" = D2."Series"   join rdr1 R1 on D3."BaseEntry" = R1."DocEntry"   left join ordr R2 on R1."DocEntry" = R2."DocEntry" where  	D2."SeriesName"=' + "'" + req.query.code + "'" + ' 	and D1."DocType" =' + "'" + 'I' + "'" + ' 	and D3."ItemCode" != ' + "'" + 'SC' + "'" + ' 	and R2."Series"=' + "'" + req.query.series + "'" + ' and D1."CANCELED" = ' + "'" + 'N' + "'" + ' and D1."DocStatus" = ' + "'" + 'O' + "'" + ''
  connection.runQuery(res, sql);
}

exports.seriesnumberall = function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'select * from nnm1'

  connection.runQuery(res,sql);
}

exports.itemroxy = function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'select   oitm."ItemCode",   oitm."ItemName",   oitm."ItmsGrpCod",   oitm."OnHand",   oitm."IsCommited",   oitm."OnOrder",   oitw."WhsCode",  oitm."OnHand" - oitm."IsCommited" + oitm."OnOrder" as "Available" from   oitm   join oitb on oitb."ItmsGrpCod" = oitm."ItmsGrpCod"   join oitw on oitm."ItemCode" = oitw."ItemCode" where   oitw."WhsCode" LIKE ' + "'" + '%RXY%' + "'" + '';

  connection.runQuery(res,sql);
}

exports.itemktb = function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');

  var sql = 'select   oitm."ItemCode",   oitm."ItemName",   oitm."ItmsGrpCod",   oitm."OnHand",   oitm."IsCommited",   oitm."OnOrder",   oitw."WhsCode",  oitm."OnHand" - oitm."IsCommited" + oitm."OnOrder" as "Available" from   oitm   join oitb on oitb."ItmsGrpCod" = oitm."ItmsGrpCod"   join oitw on oitm."ItemCode" = oitw."ItemCode" where   oitw."WhsCode" LIKE ' + "'" + '%KTB%' + "'" + '';

  connection.runQuery(res,sql);
}
