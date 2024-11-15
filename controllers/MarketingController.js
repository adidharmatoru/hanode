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

  var sql = 'select "CardCode", "CardName","Phone1","Address" from OCRD where "CardName" LIKE  ' + "'%" + req.query.code + "%'" + 'and "validFor"=' + "'Y'" + '  order by "CardName" DESC';

  connection.runQuery(res, sql);
};

exports.customerall = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select "CardCode", "CardName","Phone1", "CardType","GroupCode" from OCRD where "validFor"=' + "'Y'" + ' and "CardType" = '+"'C'"+' and "GroupCode" != 118 order by "CardName" DESC';

  connection.runQuery(res, sql);
};

exports.so = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select "CardCode","DocEntry","DocNum","CardName","Address","NumAtCard","DocTotal","CntctCode","CardCode" from ordr where "Series" in (' + "'2067'" + ',' + "'2064'" + ',' + "'2708'" + ',' + "'2711'" + ',' + "'3201'" + ',' + "'3204'" + ') and "CardCode" in (' + "'" + req.query.code + "'" + ') order by "DocNum" ASC';
  // var sql = 'select * from ordr DESC limit 5';

  connection.runQuery(res, sql);
};

exports.docTotal = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select "CardCode","DocEntry","DocNum","DocTotal" from ordr where "Series" = ' + "'2711'" + ' and "DocNum"=' + "'" + req.query.code + "'" + ' OR "Series" = ' + "'3204'" + ' and "DocNum"=' + "'" + req.query.code + "'" + ' order by "DocNum" DESC';
  // var sql = 'select * from ordr DESC limit 5';

  connection.runQuery(res, sql);
};

exports.contactPerson = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select "CntctCode" as "ContactCode", "Name", "Tel1" as "Phone", "Address", "E_MailL" as "Email" from ocpr where "CardCode" =  ' + "'" + req.query.code + "'";

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
  var sql = 'select   T0."ContractID" as "ContractNo",   T0."U_FH_PENALTY" as "Pinalty",   T0."CstmrCode" as "CustomerCode",   T0."CstmrName" as "Name",   SUBSTRING(T0."StartDate", 1, 10) as "StartDate",   SUBSTRING(T0."EndDate", 1, 10) as "EndDate",   SUBSTRING(T0."CreateDate", 1, 10) as "CreateDate",   T0."Remarks1" as "Comment",   T0."Remarks2" as "Remarks",   T0."U_FH_TERM" as "Term",   SUBSTRING(T0."U_FH_CTR_START_DATE", 1, 10) as "ContractStartDate",   SUBSTRING(T0."U_FH_CTR_DATE", 1, 10) as "ContractDate",   SUBSTRING(T0."U_FH_CTR_END_DATE", 1, 10) as "ContractEndDate",   T0."U_FH_SO_DOCNUM" as "no_so",   T0."Descriptio" as "PO",   SUBSTRING(T0."U_FH_PO_DATE", 1, 10) as "PODate",   T0."CntctCode" as "codeContact",   T0."CntrcTmplt" as "Type Contract",   T0."U_FH_CTR_NUM" as "NomorContract",   T1."Name" as "contactName",   T1."Tel1" as "contactPhone",   T1."Address" as "Address",   SUBSTRING(T0."TermDate", 1, 10) as "TermDate",   "U_FH_INCLUDE" as "ruanglingkup",   T0."Attachment" as "Attachments",  T0."U_FH_BD_BASR" as "BeritaAcara",  T0."U_FH_BD_SR" as "ServiceReport",  T0."U_FH_BD_WCN" as "wcn",  T0."U_FH_BD_ERGS" as "ergs",  T0."U_FH_BD_ESSAR" as "essar",  T0."U_FH_BD_MIGO" as "migo",  T0."U_FH_BD_SES" as "ses" from   octr T0   join ocpr T1 ON T0."CntctCode" = T1."CntctCode" where   T0."ContractID" =  ' + "'" + req.query.code + "'" + '';
  connection.runQuery(res, sql);
};

exports.sconDetailBA = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  // var sql = 'select * from oitm T1 Where "ItemName" LIKE ' + "'%"  + req.query.code + "%'" + ' order by T1."ItemCode" limit 5';
  var sql = 'select T0."ContractID" as "ContractNo", T0."CstmrCode" as "CustomerCode", T0."CstmrName" as "Name", SUBSTRING(T0."StartDate", 1,10) as "StartDate", SUBSTRING(T0."EndDate",1,10) as "EndDate",  SUBSTRING(T0."CreateDate",1,10) as "CreateDate",T0."Remarks1" as "Comment",T0."Remarks2" as "Remarks",T0."U_FH_TERM" as "Term",SUBSTRING(T0."U_FH_CTR_START_DATE",1,10) as "ContractStartDate",SUBSTRING(T0."U_FH_CTR_DATE",1,10) as "ContractDate", SUBSTRING(T0."U_FH_CTR_END_DATE",1,10) as "ContractEndDate",T0."U_FH_SO_DOCNUM" as "no_so", T0."Descriptio" as "PO", SUBSTRING(T0."U_FH_PO_DATE",1,10) as "PODate", T0."CntctCode" as "codeContact",T0."CntrcTmplt" as "Type Contract",T0."U_FH_CTR_NUM" as "NomorContract", T1."Name" as "contactName", T1."Tel1" as "contactPhone", T1."Address" as "Address",SUBSTRING(T0."TermDate",1,10) as "TermDate", "U_FH_INCLUDE" as "ruanglingkup" from octr T0 join ocpr T1 ON T0."CntctCode" = T1."CntctCode" where T0."ContractID" in (' + req.body.cid + ')';
  connection.runQuery(res, sql);
};

exports.itemCode = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select T0."itemName" as "itemName", T0."itemCode" as "itemCode",T0."insID" as "insID", T0."instLction" as "instLction",T1."Name" as "Name", IFNULL(T1."Tel1", T1."Cellolar") as "phone",T1."E_MailL" as "E_mail" from oins T0 join ocpr T1 ON T0."contactCod"=T1."CntctCode" Where "internalSN" =' + "'" + req.query.code + "'" + ' AND "status"='+"'A'"+' order by "itemCode"';
  // var sql = 'select "ItemCode","ItemName" from oitm order by "ItemCode"';
  connection.runQuery(res, sql);
};

exports.serialNum = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select SUBSTRING("dlvryDate",1,10) AS "dlvryDate","internalSN","customer","custmrName","contactCod","itemName","status","insID" from oins Where "internalSN"  LIKE  ' + "'%" + req.query.code + "%'" + ' AND "status"='+"'A'"+' order by "internalSN"';
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

  var sql = 'select "empID", "lastName" as "LastName","firstName" as "FirstName", "jobTitle" as "JobTitle" from ohem where "jobTitle" in (' + "'TEKNISI'" + ',' + "'TEKNISI SOLO'" + ',' + "'TEKNISI MAINTENANCE'" + ',' + "'TEKNISI INSTALASI'" + ',' + "'TEKNISI REPAIR'" + ') AND "Active"='+ "'Y'" +'  order by "jobTitle" asc';

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

  var sql = 'select T0."ContractID" as "ContractNo", T0."CstmrCode" as "CustomerCode", T0."CstmrName" as "Name", SUBSTRING(T0."StartDate", 1,10) as "StartDate", SUBSTRING(T0."EndDate",1,10) as "EndDate", SUBSTRING(T0."CreateDate",1,10) as "CreateDate",T0."Remarks1" as "Comment",T0."Remarks2" as "Remarks",T0."U_FH_TERM" as "Term",SUBSTRING(T0."U_FH_CTR_START_DATE",1,10) as "ContractStartDate",SUBSTRING(T0."U_FH_CTR_DATE",1,10) as "ContractDate", SUBSTRING(T0."U_FH_CTR_END_DATE",1,10) as "ContractEndDate",T0."U_FH_SO_DOCNUM" as "no_so", T0."Descriptio" as "PO", SUBSTRING(T0."U_FH_PO_DATE",1,10) as "PODate",SUBSTRING(T0."TermDate",1,10) as "TermDate", T0."CntctCode" as "codeContact",T0."CntrcTmplt" as "Type Contract",T0."U_FH_CTR_NUM" as "NomorContract", T1."Name" as "contactName", T1."Tel1" as "contactPhone" from octr T0 join ocpr T1 ON T0."CntctCode" = T1."CntctCode" where T0."TermDate" IS NULL and T0."EndDate" > NOW() ORDER BY T0."ContractID" desc';

  connection.runQuery(res, sql);
};

exports.validasiScon = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  // var sql = 'select "ContractID" as "ID Contract", "StartDate" as "Start Date" from octr order by "StartDate" desc';

  var sql = 'select T0."ContractID" as "ContractNo", T0."CstmrCode" as "CustomerCode", T0."CstmrName" as "Name", SUBSTRING(T0."StartDate", 1,10) as "StartDate", SUBSTRING(T0."EndDate",1,10) as "EndDate", SUBSTRING(T0."CreateDate",1,10) as "CreateDate",T0."Remarks1" as "Comment",T0."Remarks2" as "Remarks",T0."U_FH_TERM" as "Term",SUBSTRING(T0."U_FH_CTR_START_DATE",1,10) as "ContractStartDate",SUBSTRING(T0."U_FH_CTR_DATE",1,10) as "ContractDate", SUBSTRING(T0."U_FH_CTR_END_DATE",1,10) as "ContractEndDate",T0."U_FH_SO_DOCNUM" as "no_so", T0."Descriptio" as "PO", SUBSTRING(T0."U_FH_PO_DATE",1,10) as "PODate",SUBSTRING(T0."TermDate",1,10) as "TermDate", T0."CntctCode" as "codeContact",T0."CntrcTmplt" as "Type Contract",T0."U_FH_CTR_NUM" as "NomorContract", T1."Name" as "contactName", T1."Tel1" as "contactPhone" from octr T0 join ocpr T1 ON T0."CntctCode" = T1."CntctCode" where T0."TermDate" IS NULL ORDER BY T0."ContractID" desc';

  connection.runQuery(res, sql);
};
exports.ServiceContractTerm = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  // var sql = 'select "ContractID" as "ID Contract", "StartDate" as "Start Date" from octr order by "StartDate" desc';

  var sql = 'select T0."ContractID" as "ContractNo", T0."CstmrCode" as "CustomerCode", T0."CstmrName" as "Name", SUBSTRING(T0."StartDate", 1,10) as "StartDate", SUBSTRING(T0."EndDate",1,10) as "EndDate", SUBSTRING(T0."CreateDate",1,10) as "CreateDate",T0."Remarks1" as "Comment",T0."Remarks2" as "Remarks",T0."U_FH_TERM" as "Term",SUBSTRING(T0."U_FH_CTR_START_DATE",1,10) as "ContractStartDate",SUBSTRING(T0."U_FH_CTR_DATE",1,10) as "ContractDate", SUBSTRING(T0."U_FH_CTR_END_DATE",1,10) as "ContractEndDate",T0."U_FH_SO_DOCNUM" as "no_so", T0."Descriptio" as "PO", SUBSTRING(T0."U_FH_PO_DATE",1,10) as "PODate",SUBSTRING(T0."TermDate",1,10) as "TermDate", T0."CntctCode" as "codeContact",T0."CntrcTmplt" as "Type Contract",T0."U_FH_CTR_NUM" as "NomorContract", T1."Name" as "contactName", T1."Tel1" as "contactPhone" from octr T0 join ocpr T1 ON T0."CntctCode" = T1."CntctCode" where "StartDate" BETWEEN  ' + "'" + req.query.year + "'" + ' AND  ' + "'" + req.query.yer + "'" + ' AND T0."TermDate" IS not NULL ORDER BY T0."ContractID" desc';

  connection.runQuery(res, sql);
};

exports.SconItem = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    var sql = 'SELECT   distinct T0."ContractID" as "contractID",   T0."ItemCode" as "Code_Item",   T0."Line" as "LineNum",  T0."ItemName" as "Item_Name",   T0."U_FH_MNT" AS "Visit",  T0."InternalSN" as "SerinalNum",   T3."custmrName" as "customerName",   T3."instLction" as "Location",   SUBSTRING(T0."StartDate", 1, 10) as "StartDate",T3."insID" as "insID",   SUBSTRING(T0."EndDate", 1, 10) as "EndDate",  T4."Name" as "Name",   T4."Tel1" as "phone",   T4."E_MailL" as "E_mail" FROM   CTR1 T0   JOIN OCTR T1 ON T1."ContractID" = T0."ContractID"   left join oins T3 ON T0."InsID" = T3."insID"   left join ocpr T4 ON T3."contactCod" = T4."CntctCode"  where T0."ContractID" in (' + req.body.cid + ') and T3."status"='+ "'A'" +' and T0."TermDate" is null  order by T0."ContractID"';

  connection.runQuery(res, sql);
};

exports.Scall = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  // var sql = 'SELECT T0."customer" as "customer", T0."contractID" as "ContractNo",T0."DocNum" as "DocNum",T0."subject" as "Subject",T0."BPShipAddr" as "address",T0."itemName" as "ItemName", T0."itemCode" as "ItemCode", T0."internalSN" as "internalSN", T0."U_VIT_NOSO" as "No SO",  T0."Telephone" as "tlpn", SUBSTRING(T3."DateCreate",1,10) as "DateCreate",T3."SltCode" as "SltCode","status", T0."callID" as "SC_no", SUBSTRING(T0."createDate",1,10) as "SC_date", SUBSTRING(T0."cntrctDate",1,10), T0."DocNum" as "DocNum",T5."Name" as "ContactName",SUBSTRING(T0."closeDate",1,10) as "SC_enddate", T4."SeriesName" as "SeriesName", T0."U_KS_REMARK" as "Remark", T0."Location" as "Location",AT."AbsEntry" as "AbsEntry",AT."FileExt" as "FileExt",AT."FileName" as "FileName", AT."trgtPath" as "targetPath" FROM OSCL T0 left join scl1 T2 ON T0."callID"=T2."srvcCallID" left join oslt T3 ON T2."solutionID"=T3."SltCode" join nnm1 T4 on T0."Series" = T4."Series" left join ocpr T5 on T5."CntctCode"=T0."contctCode" left join ATC1 AT on AT."AbsEntry"=T0."AtcEntry" where T4."SeriesName" = ' + "'SCCONT22'" + ' and T0."contractID" in (' + req.body.cid + ') order by T0."contractID"';

  var sql = 'SELECT T0."customer" as "customer", T0."contractID" as "ContractNo",T0."DocNum" as "DocNum",T0."subject" as "Subject",T0."BPShipAddr" as "address",T0."itemName" as "ItemName",T0."itemCode" as "ItemCode", T0."internalSN" as "internalSN", T0."U_VIT_NOSO" as "No SO",  T0."Telephone" as "tlpn", SUBSTRING(T3."DateCreate",1,10) as "DateCreate",T3."SltCode" as "SltCode","status", T0."callID" as "SC_no", SUBSTRING(T0."createDate",1,10) as "SC_date", SUBSTRING(T0."cntrctDate",1,10), T0."DocNum" as "DocNum",T5."Name" as "ContactName",SUBSTRING(T0."closeDate",1,10) as "SC_enddate", T4."SeriesName" as "SeriesName", T0."U_KS_REMARK" as "Remark", T0."Location" as "Location",AT."AbsEntry" as "AbsEntry",AT."FileExt" as "FileExt",AT."FileName" as "FileName", AT."trgtPath" as "targetPath" FROM OSCL T0 	left join scl1 T2 ON T0."callID"=T2."srvcCallID" 	left join oslt T3 ON T2."solutionID"=T3."SltCode" 	join nnm1 T4 on T0."Series" = T4."Series" 	left join ocpr T5 on T5."CntctCode"=T0."contctCode" 	left join ATC1 AT on AT."AbsEntry"=T0."AtcEntry" 	where T0."contractID" in ('+ req.body.cid +') order by T0."contractID"';

  connection.runQuery(res, sql);
};

exports.ScallDetail = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select T0."customer" as "customer", T0."contractID" as "ContractNo", T0."callID" as "SC_no", T0."custmrName" as "Name",T0."BPShipAddr" as "Address",T0."BPBillAddr" as "Address2",T0."internalSN" as "SerialNum",T0."itemCode" as "ItemCode",T0."itemName" as "ItemName",T0."U_VIT_BMRK" as "MerkBatterai",T0."U_VIT_BMOD" as "ModelBatterai",SUBSTRING(T0."U_VIT_BDAT",1,10) as "DateBatterai",T0."U_VIT_BPCS" as "BatteraiPCS",T0."U_VIT_TINR" as "Tegangan_in_R",T0."U_VIT_TINS" as "Tegangan_in_S",T0."U_VIT_TINT" as "Tegangan_in_T",T0."U_VIT_TOUR" as "Tegangan_out_R",T0."U_VIT_TOUS" as "Tegangan_out_S",T0."U_VIT_TOUT" as "Tegangan_out_T",SUBSTRING(T1."StartDate",1,10) as "StartDate",SUBSTRING(T1."EndDate",1,10) as "EndDate",T1."Descriptio" as "NomorPO",T4."SeriesName" as "SeriesName",T0."DocNum" as "DocNum",SUBSTRING(T0."createDate",1,10) as "DateCreate",T2."Name" as "ContactName",T0."Telephone" as "tlpn",T0."subject" as "Subject",T0."U_KS_REMARK" as "Remark", T0."contctCode" as "contctCode",T3."itemName" as "itemNameEQ",T0."status" as "status" from oscl T0 left join octr T1 on T0."contractID"=T1."ContractID" LEFT JOIN ocpr T2 on T2."CntctCode"=T0."contctCode" left join oins T3 on T0."internalSN" = T3."internalSN" join nnm1 T4 on T0."Series" = T4."Series" where T0."callID" = ' + "'" + req.query.code + "'" + '';

  connection.runQuery(res, sql);
};

exports.Inv = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed FORMAT(CAST(T1."U_VIT_TOT" AS DECIMAL(20,6)) , "g16")

  var sql = 'SELECT T0."DocNum" as "DocNum",T0."U_FH_SO_DOCNUM" as "SO_no", T2."DocNum" as "no_inv", T4."U_VIT_TOPY" as "pelunasan", SUBSTRING(T2."DocDate",1,10) as "inv_date", T1."U_VIT_TOT" as "TotPrice" FROM octr T0 join inv1 T1 on T1."BaseRef" = T0."U_FH_SO_DOCNUM" left join oinv T2 on T2."DocEntry" = T1."DocEntry" left join ordr T4 on T0."DocNum" = T4."DocNum" where T0."U_FH_SO_DOCNUM" = ' + "'" + req.query.cid + "'" + ' order by T0."U_FH_SO_DOCNUM"';

  connection.runQuery(res, sql);
};

exports.InvBA = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed FORMAT(CAST(T1."U_VIT_TOT" AS DECIMAL(20,6)) , "g16")

  var sql = 'SELECT T0."ContractID" as "NoContract", T0."DocNum" as "DocNum",T0."U_FH_SO_DOCNUM" as "SO_no", T2."DocNum" as "no_inv", T4."U_VIT_TOPY" as "pelunasan", SUBSTRING(T2."DocDate",1,10) as "inv_date", T1."U_VIT_TOT" as "TotPrice" FROM octr T0 join inv1 T1 on T1."BaseRef" = T0."U_FH_SO_DOCNUM" left join oinv T2 on T2."DocEntry" = T1."DocEntry" left join ordr T4 on T0."DocNum" = T4."DocNum" where T0."U_FH_SO_DOCNUM" in (' + req.body.cid + ') order by T0."U_FH_SO_DOCNUM"';
  // var sql = 'SELECT T1."DocNum",T1."DocDate",T1."DocEntry"from octr T0 join ordr T1 on T1."DocNum" = T0."U_FH_SO_DOCNUM" where T0."U_FH_SO_DOCNUM" in (' + req.body.cid + ') order by T0."U_FH_SO_DOCNUM"';

  connection.runQuery(res, sql);
};

exports.scallcreated = function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed FORMAT(CAST(T1."U_VIT_TOT" AS DECIMAL(20,6)) , "g16")

  var sql = 'select "callID" as "callID", "DocNum" as "DocNum" from oscl order by "callID" desc';
  connection.runQuery(res, sql);
}

exports.reportscalldone = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'SELECT T0."contractID" as "ContractNo",T0."subject" as "Subject",T0."BPShipAddr" as "address",T0."itemName" as "ItemName", T0."itemCode" as "ItemCode", T0."internalSN" as "internalSN", T0."U_VIT_NOSO" as "No SO",  T0."Telephone" as "tlpn", SUBSTRING(T3."DateCreate",1,10) as "DateCreate",T3."SltCode" as "SltCode","status", T0."callID" as "SC_no", SUBSTRING(T0."createDate",1,10) as "SC_date", SUBSTRING(T0."cntrctDate",1,10) as "ContractDate", T0."DocNum" as "DocNum",T5."Name" as "ContactName",SUBSTRING(T0."closeDate",1,10) as "SC_enddate", T4."SeriesName" as "SeriesName", T0."U_KS_REMARK" as "Remark", T0."Location" as "Location", T0."custmrName" as "Name", AT."AbsEntry" as "AbsEntry",AT."FileExt" as "FileExt",AT."FileName" as "FileName", AT."trgtPath" as "targetPath" FROM OSCL T0 left join scl1 T2 ON T0."callID"=T2."srvcCallID" left join oslt T3 ON T2."solutionID"=T3."SltCode" left join nnm1 T4 on T0."Series" = T4."Series" left join ocpr T5 on T5."CntctCode"=T0."contctCode" left join ATC1 AT on AT."AbsEntry"=T0."AtcEntry"  where "status" in  (' + req.body.status + ') and T0."createDate" BETWEEN  ' + "'" + req.body.year + "'" + ' AND  ' + "'" + req.body.yer + "'" + ' and T4."SeriesName"= ' + "'" + req.body.series + "'" + ' order by T0."createDate" desc';

  connection.runQuery(res, sql);
};

exports.reportscallsolo = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'SELECT T0."contractID" as "ContractNo",T0."subject" as "Subject",T0."BPShipAddr" as "address",T0."itemName" as "ItemName", T0."itemCode" as "ItemCode", T0."internalSN" as "internalSN", T0."U_VIT_NOSO" as "No SO",  T0."Telephone" as "tlpn", SUBSTRING(T3."DateCreate",1,10) as "DateCreate",T3."SltCode" as "SltCode","status", T0."callID" as "SC_no", SUBSTRING(T0."createDate",1,10) as "SC_date", SUBSTRING(T0."cntrctDate",1,10) as "ContractDate", T0."DocNum" as "DocNum",T5."Name" as "ContactName",SUBSTRING(T0."closeDate",1,10) as "SC_enddate", T4."SeriesName" as "SeriesName", T0."U_KS_REMARK" as "Remark", T0."Location" as "Location", T0."custmrName" as "Name", AT."AbsEntry" as "AbsEntry",AT."FileExt" as "FileExt",AT."FileName" as "FileName", AT."trgtPath" as "targetPath" FROM OSCL T0 left join scl1 T2 ON T0."callID"=T2."srvcCallID" left join oslt T3 ON T2."solutionID"=T3."SltCode" left join nnm1 T4 on T0."Series" = T4."Series" left join ocpr T5 on T5."CntctCode"=T0."contctCode" left join ATC1 AT on AT."AbsEntry"=T0."AtcEntry"  where "status" in  (' + req.body.status + ') and T0."createDate" BETWEEN  ' + "'" + req.body.year + "'" + ' AND  ' + "'" + req.body.yer + "'" + ' order by T0."callID" desc limit 500';

  connection.runQuery(res, sql);
};

exports.listingPenawaran = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'SELECT T0."contractID" as "ContractNo",T0."subject" as "Subject",T0."BPShipAddr" as "address",T0."itemName" as "ItemName", T0."itemCode" as "ItemCode", T0."internalSN" as "internalSN", T0."U_VIT_NOSO" as "No SO",  T0."Telephone" as "tlpn", SUBSTRING(T3."DateCreate",1,10) as "DateCreate",T3."SltCode" as "SltCode","status", T0."callID" as "SC_no", SUBSTRING(T0."createDate",1,10) as "SC_date", SUBSTRING(T0."cntrctDate",1,10) as "ContractDate", T0."DocNum" as "DocNum",T5."Name" as "ContactName",SUBSTRING(T0."closeDate",1,10) as "SC_enddate", T4."SeriesName" as "SeriesName", T0."U_KS_REMARK" as "Remark", T0."Location" as "Location", T0."custmrName" as "Name", AT."AbsEntry" as "AbsEntry",AT."FileExt" as "FileExt",AT."FileName" as "FileName", AT."trgtPath" as "targetPath" FROM OSCL T0 left join scl1 T2 ON T0."callID"=T2."srvcCallID" left join oslt T3 ON T2."solutionID"=T3."SltCode" left join nnm1 T4 on T0."Series" = T4."Series" left join ocpr T5 on T5."CntctCode"=T0."contctCode" left join ATC1 AT on AT."AbsEntry"=T0."AtcEntry"  where "status" in  (' + req.body.status + ') and T0."createDate" BETWEEN  ' + "'" + req.body.year + "'" + ' AND  ' + "'" + req.body.yer + "'" + ' order by T0."DocNum" desc';

  connection.runQuery(res, sql);
};

exports.fh_oscl = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed FORMAT(CAST(T1."U_VIT_TOT" AS DECIMAL(20,6)) , "g16")

    var sql = 'select distinct coalesce("ItemFull", "ItemName") AS "ItemFullName","ItemCapacity", CONCAT("ItemBrand","ItemModel") as "Items", "ItemType" as "Type","ItemMeasurement" as "Measurement","ItemSN" as "serialNum","ItemCode" as "ItemCode","ItemName" as "Item","callID" as "callid" from fh_oscl where "ItemCapacity" is not null and "ItemSN"= ' + "'" + req.query.req + "'" + '';

  connection.runQuery(res, sql);
};

exports.mencaricallid = function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed FORMAT(CAST(T1."U_VIT_TOT" AS DECIMAL(20,6)) , "g16")

  var sql = 'select "callID","status","DocNum" from oscl where "DocNum"= ' + "'" + req.query.req + "'" + ' or "callID" = ' + "'" + req.query.req + "'" + '';

connection.runQuery(res, sql);
}

exports.numbercontract = function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed FORMAT(CAST(T1."U_VIT_TOT" AS DECIMAL(20,6)) , "g16")

  var sql = 'select "ContractID" from octr where "ContractID" LIKE  ' + "'%" + req.query.code + "%'" + ' and "TermDate" is null';

connection.runQuery(res, sql);
}
