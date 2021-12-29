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

  var sql = 'select "CardCode", "CardName","Phone1" from OCRD where "CardName" LIKE  ' + "'%" + req.query.code + "%'" + ' order by "CardName" DESC';

  connection.runQuery(res, sql);
};

exports.so = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select "CardCode","DocEntry","DocNum","CardName","Address","NumAtCard","DocTotal","CntctCode","CardCode" from ordr where "Series"= ' + "'1674'" + ' and "CardCode" in (' + "'" + req.query.code + "'" + ') order by "DocNum" ASC';
  // var sql = 'select * from ordr DESC limit 5';

  connection.runQuery(res, sql);
};

exports.docTotal = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select "CardCode","DocEntry","DocNum","DocTotal" from ordr where "Series"= ' + "'1674'" + ' and "DocNum"=' + "'" + req.query.code + "'" + ' order by "DocNum" DESC';
  // var sql = 'select * from ordr DESC limit 5';

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

exports.scon = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  // var sql = 'select * from oitm T1 Where "ItemName" LIKE ' + "'%"  + req.query.code + "%'" + ' order by T1."ItemCode" limit 5';
  var sql = 'select "ContractID" as "ID Contract", "StartDate" as "Start Date" from octr order by "ContractID" desc';
  connection.runQuery(res, sql);
};

exports.sconDetail = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  // var sql = 'select * from oitm T1 Where "ItemName" LIKE ' + "'%"  + req.query.code + "%'" + ' order by T1."ItemCode" limit 5';
  var sql = 'select T0."ContractID" as "ContractNo", T0."CstmrCode" as "CustomerCode", T0."CstmrName" as "Name", SUBSTRING(T0."StartDate", 1,10) as "StartDate", SUBSTRING(T0."EndDate",1,10) as "EndDate",  SUBSTRING(T0."CreateDate",1,10) as "CreateDate",T0."Remarks1" as "Comment",T0."Remarks2" as "Remarks",T0."U_FH_TERM" as "Term",SUBSTRING(T0."U_FH_CTR_START_DATE",1,10) as "ContractStartDate",SUBSTRING(T0."U_FH_CTR_DATE",1,10) as "ContractDate", SUBSTRING(T0."U_FH_CTR_END_DATE",1,10) as "ContractEndDate",T0."U_FH_SO_DOCNUM" as "no_so", T0."Descriptio" as "PO", SUBSTRING(T0."U_FH_PO_DATE",1,10) as "PODate", T0."CntctCode" as "codeContact",T0."CntrcTmplt" as "Type Contract",T0."U_FH_CTR_NUM" as "NomorContract", T1."Name" as "contactName", T1."Tel1" as "contactPhone", T1."Address" as "Address" from octr T0 join ocpr T1 ON T0."CntctCode" = T1."CntctCode" where "ContractID"=  ' + "'" + req.query.code + "'";
  connection.runQuery(res, sql);
};

exports.itemCode = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select T0."itemName" as "itemName", T0."itemCode" as "itemCode",T0."insID" as "insID", T0."instLction" as "instLction",T1."Name" as "Name", T1."Tel1" as "phone",T1."E_MailL" as "E_mail" from oins T0 join ocpr T1 ON T0."contactCod"=T1."CntctCode" Where "internalSN" =' + "'" + req.query.code + "'" + ' AND "status"='+"'A'"+' order by "itemCode"';
  // var sql = 'select "ItemCode","ItemName" from oitm order by "ItemCode"';
  connection.runQuery(res, sql);
};

exports.serialNum = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select "internalSN","customer","contactCod","itemName" from oins Where "internalSN" LIKE  ' + "'%" + req.query.code + "%'" + ' AND "status"='+"'A'"+' order by "internalSN"';
  // var sql = 'select "ItemCode","ItemName" from oitm order by "ItemCode"';
  connection.runQuery(res, sql);
};

exports.attachment = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select "AbsEntry" from atc1 order by "AbsEntry" desc';
  // var sql = 'select "ItemCode","ItemName" from oitm order by "ItemCode"';
  connection.runQuery(res, sql);
};


exports.contact = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select "CntctCode", "Name","Tel1","Tel2","Address","Cellolar","E_MailL" from ocpr Where "CardCode" LIKE  ' + "'%" + req.query.code + "%'" + ' order by "CntctCode"';
  // var sql = 'select "ItemCode","ItemName" from oitm order by "ItemCode"';
  connection.runQuery(res, sql);
};


exports.teknisi = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  // var sql = 'select "ContractID" as "ID Contract", "StartDate" as "Start Date" from octr order by "StartDate" desc';

  var sql = 'select "empID", "lastName" as "LastName","firstName" as "FirstName", "jobTitle" as "JobTitle" from ohem where "lastName" LIKE  ' + "'%" + req.query.code + "%'" + ' AND "jobTitle" in (' + "'TEKNISI'" + ',' + "'TEKNISI SOLO'" + ',' + "'TEKNISI MAINTENANCE'" + ',' + "'TEKNISI INSTALASI'" + ',' + "'TEKNISI REPAIR'" + ') AND "Active"='+ "'Y'" +' order by "jobTitle" asc';

  connection.runQuery(res, sql);
};

exports.teknik = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  // var sql = 'select "ContractID" as "ID Contract", "StartDate" as "Start Date" from octr order by "StartDate" desc';

  var sql = 'select "empID", "lastName" as "LastName","firstName" as "FirstName", "jobTitle" as "JobTitle" from ohem where "empID" in (' + req.query.id + ') AND "Active"='+ "'Y'" +' order by "jobTitle" asc';

  connection.runQuery(res, sql);
};

exports.ServiceContract = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  // var sql = 'select "ContractID" as "ID Contract", "StartDate" as "Start Date" from octr order by "StartDate" desc';

  var sql = 'select T0."ContractID" as "ContractNo", T0."CstmrCode" as "CustomerCode", T0."CstmrName" as "Name", SUBSTRING(T0."StartDate", 1,10) as "StartDate", SUBSTRING(T0."EndDate",1,10) as "EndDate", SUBSTRING(T0."CreateDate",1,10) as "CreateDate",T0."Remarks1" as "Comment",T0."Remarks2" as "Remarks",T0."U_FH_TERM" as "Term",SUBSTRING(T0."U_FH_CTR_START_DATE",1,10) as "ContractStartDate",SUBSTRING(T0."U_FH_CTR_DATE",1,10) as "ContractDate", SUBSTRING(T0."U_FH_CTR_END_DATE",1,10) as "ContractEndDate",T0."U_FH_SO_DOCNUM" as "no_so", T0."Descriptio" as "PO", SUBSTRING(T0."U_FH_PO_DATE",1,10) as "PODate", T0."CntctCode" as "codeContact",T0."CntrcTmplt" as "Type Contract",T0."U_FH_CTR_NUM" as "NomorContract", T1."Name" as "contactName", T1."Tel1" as "contactPhone" from octr T0 join ocpr T1 ON T0."CntctCode" = T1."CntctCode" where SUBSTRING(T0."StartDate",3, 2) in (' + req.query.year + ') and T0."TermDate" IS NULL ORDER BY T0."ContractID" desc';

  connection.runQuery(res, sql);
};

exports.SconItem = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  // var sql = 'SELECT distinct T0."Project" as "PrjCode", T1."DocNum" as "SO DocNum", left(T0."DocDate", 10) as "SO Date",T2."SlpName" as "SalesPerson",T1."CardName" as "Customer",T1."NumAtCard" as "PO",T0."ItemCode" as "ItemCode",T0."Dscription" as "ItemName",dln1."Quantity",dln1."Price",T0."LineTotal", T1."U_VIT_TOPY", dln."DocNum" as "Delivery", left(dln."DocDate", 10) as "DeliveryDate", dln."U_VIT_DIOL" as "Receiver"FROM RDR1 T0 JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry" left join dln1 dln1 on T0."Dscription" = dln1."Dscription" and T0."Project" = dln1."Project" left join odln dln on dln1."DocEntry" = dln."DocEntry" left join oinv inv on T1."DocEntry" = inv."DocEntry" left JOIN OSLP T2 ON T2."SlpCode" = T1."SlpCode" left join oprj prj on T0."Project" = prj."PrjCode" where T0."Project" is not null and T0."Project" != ' + "'" + "'" +' and (T0."Dscription" NOT LIKE  ' + "'%EATON" + "%'" + ' or T0."Dscription" NOT LIKE  ' + "'%LKPP" + "%'" + 'or T0."Dscription" NOT LIKE  ' + "'%PENGIRIMAN" + "%'" + 'or T0."Dscription" NOT LIKE  ' + "'%PANEL" + "%'" + ') and left(prj."U_StartDate", 4) = year(CURRENT_DATE) and dln."CANCELED" != ' + "'Y" + "'" +'order by T0."Project"';

    var sql = 'SELECT distinct T0."ContractID" as "contractID", T0."ItemCode" as "Code_Item", T0."ItemName" as "Item_Name", T0."InternalSN" as "SerinalNum", T3."custmrName" as "customerName", T3."instLction" as "Location" FROM CTR1 T0 JOIN OCTR T1 ON T1."ContractID" = T0."ContractID" left join oins T3 ON T0."InternalSN" = T3."internalSN" where T0."ContractID" in (' + req.body.cid + ') order by T0."ContractID"';

  connection.runQuery(res, sql);
};

exports.Scall = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  // var sql = 'SELECT distinct T0."Project" as "PrjCode", T1."DocNum" as "SO DocNum", left(T0."DocDate", 10) as "SO Date",T2."SlpName" as "SalesPerson",T1."CardName" as "Customer",T1."NumAtCard" as "PO",T0."ItemCode" as "ItemCode",T0."Dscription" as "ItemName",dln1."Quantity",dln1."Price",T0."LineTotal", T1."U_VIT_TOPY", dln."DocNum" as "Delivery", left(dln."DocDate", 10) as "DeliveryDate", dln."U_VIT_DIOL" as "Receiver"FROM RDR1 T0 JOIN ORDR T1 ON T1."DocEntry" = T0."DocEntry" left join dln1 dln1 on T0."Dscription" = dln1."Dscription" and T0."Project" = dln1."Project" left join odln dln on dln1."DocEntry" = dln."DocEntry" left join oinv inv on T1."DocEntry" = inv."DocEntry" left JOIN OSLP T2 ON T2."SlpCode" = T1."SlpCode" left join oprj prj on T0."Project" = prj."PrjCode" where T0."Project" is not null and T0."Project" != ' + "'" + "'" +' and (T0."Dscription" NOT LIKE  ' + "'%EATON" + "%'" + ' or T0."Dscription" NOT LIKE  ' + "'%LKPP" + "%'" + 'or T0."Dscription" NOT LIKE  ' + "'%PENGIRIMAN" + "%'" + 'or T0."Dscription" NOT LIKE  ' + "'%PANEL" + "%'" + ') and left(prj."U_StartDate", 4) = year(CURRENT_DATE) and dln."CANCELED" != ' + "'Y" + "'" +'order by T0."Project"';

  var sql = 'SELECT distinct T0."contractID" as "ContractNo",SUBSTRING(T3."DateCreate",1,10) as "DateCreate",T3."SltCode" as "SltCode","status", T0."callID" as "SC_no", SUBSTRING(T0."createDate",1,10) as "SC_date", SUBSTRING(T0."cntrctDate",1,10), T0."DocNum" as "DocNum",SUBSTRING(T0."closeDate",1,10) as "SC_enddate" FROM OSCL T0 join scl1 T2 ON T0."callID"=T2."srvcCallID" join oslt T3 ON T2."solutionID"=T3."SltCode" where T0."contractID" in (' + req.body.cid + ') order by T0."contractID"';

  connection.runQuery(res, sql);
};

exports.Inv = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed FORMAT(CAST(T1."U_VIT_TOT" AS DECIMAL(20,6)) , "g16")

  var sql = 'SELECT T0."U_FH_SO_DOCNUM" as "SO_no", T2."DocNum" as "no_inv", T4."U_VIT_TOPY" as "pelunasan", SUBSTRING(T2."DocDate",1,10) as "inv_date", T1."U_VIT_TOT" as "TotPrice" FROM octr T0 join inv1 T1 on T1."BaseRef" = T0."U_FH_SO_DOCNUM" left join oinv T2 on T2."DocEntry" = T1."DocEntry" left join ordr T4 on T0."DocNum" = T4."DocNum" where T0."U_FH_SO_DOCNUM" in (' + req.body.cid + ') order by T0."U_FH_SO_DOCNUM"';
  // var sql = 'SELECT T1."DocNum",T1."DocDate",T1."DocEntry"from octr T0 join ordr T1 on T1."DocNum" = T0."U_FH_SO_DOCNUM" where T0."U_FH_SO_DOCNUM" in (' + req.body.cid + ') order by T0."U_FH_SO_DOCNUM"';

  connection.runQuery(res, sql);
};
