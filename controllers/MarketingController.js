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

  var sql = 'select "CardCode","DocEntry","DocNum","CardName","Address","NumAtCard","DocTotal","CntctCode","CardCode" from ordr where "Series" in ( ' + "'1674'" + ',' + "'2067'" + ') and "CardCode" in (' + "'" + req.query.code + "'" + ') order by "DocNum" ASC';
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
  var sql = 'select T0."ContractID" as "ContractNo", T0."CstmrCode" as "CustomerCode", T0."CstmrName" as "Name", SUBSTRING(T0."StartDate", 1,10) as "StartDate", SUBSTRING(T0."EndDate",1,10) as "EndDate",  SUBSTRING(T0."CreateDate",1,10) as "CreateDate",T0."Remarks1" as "Comment",T0."Remarks2" as "Remarks",T0."U_FH_TERM" as "Term",SUBSTRING(T0."U_FH_CTR_START_DATE",1,10) as "ContractStartDate",SUBSTRING(T0."U_FH_CTR_DATE",1,10) as "ContractDate", SUBSTRING(T0."U_FH_CTR_END_DATE",1,10) as "ContractEndDate",T0."U_FH_SO_DOCNUM" as "no_so", T0."Descriptio" as "PO", SUBSTRING(T0."U_FH_PO_DATE",1,10) as "PODate", T0."CntctCode" as "codeContact",T0."CntrcTmplt" as "Type Contract",T0."U_FH_CTR_NUM" as "NomorContract", T1."Name" as "contactName", T1."Tel1" as "contactPhone", T1."Address" as "Address",SUBSTRING(T0."TermDate",1,10) as "TermDate", "U_FH_INCLUDE" as "ruanglingkup" from octr T0 join ocpr T1 ON T0."CntctCode" = T1."CntctCode" where "ContractID" in  ' + "'" + req.query.code + "'";
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

  var sql = 'select T0."ContractID" as "ContractNo", T0."CstmrCode" as "CustomerCode", T0."CstmrName" as "Name", SUBSTRING(T0."StartDate", 1,10) as "StartDate", SUBSTRING(T0."EndDate",1,10) as "EndDate", SUBSTRING(T0."CreateDate",1,10) as "CreateDate",T0."Remarks1" as "Comment",T0."Remarks2" as "Remarks",T0."U_FH_TERM" as "Term",SUBSTRING(T0."U_FH_CTR_START_DATE",1,10) as "ContractStartDate",SUBSTRING(T0."U_FH_CTR_DATE",1,10) as "ContractDate", SUBSTRING(T0."U_FH_CTR_END_DATE",1,10) as "ContractEndDate",T0."U_FH_SO_DOCNUM" as "no_so", T0."Descriptio" as "PO", SUBSTRING(T0."U_FH_PO_DATE",1,10) as "PODate",SUBSTRING(T0."TermDate",1,10) as "TermDate", T0."CntctCode" as "codeContact",T0."CntrcTmplt" as "Type Contract",T0."U_FH_CTR_NUM" as "NomorContract", T1."Name" as "contactName", T1."Tel1" as "contactPhone" from octr T0 join ocpr T1 ON T0."CntctCode" = T1."CntctCode" where "StartDate" BETWEEN  ' + "'" + req.query.year + "'" + ' AND  ' + "'" + req.query.yer + "'" + ' AND T0."TermDate" IS NULL ORDER BY T0."ContractID" desc';

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

    var sql = 'SELECT distinct T0."ContractID" as "contractID", T0."ItemCode" as "Code_Item", T0."ItemName" as "Item_Name", T0."InternalSN" as "SerinalNum", T3."custmrName" as "customerName", T3."instLction" as "Location",  SUBSTRING(T0."StartDate",1,10) as "StartDate", SUBSTRING(T0."EndDate",1,10) as "EndDate" FROM CTR1 T0 JOIN OCTR T1 ON T1."ContractID" = T0."ContractID" left join oins T3 ON T0."InsID" = T3."insID" where T0."ContractID" in (' + req.body.cid + ') and T3."status"='+ "'A'" +'  order by T0."ContractID"';

  connection.runQuery(res, sql);
};

exports.Scall = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'SELECT T0."contractID" as "ContractNo",T0."DocNum" as "DocNum",T0."subject" as "Subject",T0."BPShipAddr" as "address",T0."itemName" as "ItemName", T0."itemCode" as "ItemCode", T0."internalSN" as "internalSN", T0."U_VIT_NOSO" as "No SO",  T0."Telephone" as "tlpn", SUBSTRING(T3."DateCreate",1,10) as "DateCreate",T3."SltCode" as "SltCode","status", T0."callID" as "SC_no", SUBSTRING(T0."createDate",1,10) as "SC_date", SUBSTRING(T0."cntrctDate",1,10), T0."DocNum" as "DocNum",T5."Name" as "ContactName",SUBSTRING(T0."closeDate",1,10) as "SC_enddate", T4."SeriesName" as "SeriesName", T0."U_KS_REMARK" as "Remark", T0."Location" as "Location",AT."AbsEntry" as "AbsEntry",AT."FileExt" as "FileExt",AT."FileName" as "FileName", AT."trgtPath" as "targetPath" FROM OSCL T0 left join scl1 T2 ON T0."callID"=T2."srvcCallID" left join oslt T3 ON T2."solutionID"=T3."SltCode" join nnm1 T4 on T0."Series" = T4."Series" left join ocpr T5 on T5."CntctCode"=T0."contctCode" left join ATC1 AT on AT."AbsEntry"=T0."AtcEntry" where T0."contractID" in (' + req.body.cid + ') order by T0."contractID"';

  connection.runQuery(res, sql);
};

exports.ScallDetail = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select T0."contractID" as "ContractNo", T0."callID" as "SC_no", T0."custmrName" as "Name",T0."BPShipAddr" as "Address",T0."internalSN" as "SerialNum",T0."itemCode" as "ItemCode",T0."itemName" as "ItemName",T0."U_VIT_BMRK" as "MerkBatterai",T0."U_VIT_BMOD" as "ModelBatterai",SUBSTRING(T0."U_VIT_BDAT",1,10) as "DateBatterai",T0."U_VIT_BPCS" as "BatteraiPCS",T0."U_VIT_TINR" as "Tegangan_in_R",T0."U_VIT_TINS" as "Tegangan_in_S",T0."U_VIT_TINT" as "Tegangan_in_T",T0."U_VIT_TOUR" as "Tegangan_out_R",T0."U_VIT_TOUS" as "Tegangan_out_S",T0."U_VIT_TOUT" as "Tegangan_out_T",SUBSTRING(T1."StartDate",1,10) as "StartDate",SUBSTRING(T1."EndDate",1,10) as "EndDate",T4."SeriesName" as "SeriesName",T0."DocNum" as "DocNum",SUBSTRING(T0."createDate",1,10) as "DateCreate",T2."Name" as "ContactName",T0."Telephone" as "tlpn",T0."subject" as "Subject",T0."U_KS_REMARK" as "Remark" from oscl T0 left join octr T1 on T0."contractID"=T1."ContractID" LEFT JOIN ocpr T2 on T2."CntctCode"=T0."contctCode" join nnm1 T4 on T0."Series" = T4."Series" where T0."callID" = ' + "'" + req.query.code + "'" + '';

  connection.runQuery(res, sql);
};

exports.Inv = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed FORMAT(CAST(T1."U_VIT_TOT" AS DECIMAL(20,6)) , "g16")

  var sql = 'SELECT T0."DocNum" as "DocNum",T0."U_FH_SO_DOCNUM" as "SO_no", T2."DocNum" as "no_inv", T4."U_VIT_TOPY" as "pelunasan", SUBSTRING(T2."DocDate",1,10) as "inv_date", T1."U_VIT_TOT" as "TotPrice" FROM octr T0 join inv1 T1 on T1."BaseRef" = T0."U_FH_SO_DOCNUM" left join oinv T2 on T2."DocEntry" = T1."DocEntry" left join ordr T4 on T0."DocNum" = T4."DocNum" where T0."U_FH_SO_DOCNUM" = ' + "'" + req.query.cid + "'" + ' order by T0."U_FH_SO_DOCNUM"';
  // var sql = 'SELECT T1."DocNum",T1."DocDate",T1."DocEntry"from octr T0 join ordr T1 on T1."DocNum" = T0."U_FH_SO_DOCNUM" where T0."U_FH_SO_DOCNUM" in (' + req.body.cid + ') order by T0."U_FH_SO_DOCNUM"';

  connection.runQuery(res, sql);
};

exports.CorrectiveMaintenance = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed FORMAT(CAST(T1."U_VIT_TOT" AS DECIMAL(20,6)) , "g16")

  var sql = 'select T1."DocStatus",T1."DocNum",T1."CardName",T1."NumAtCard",SUBSTR_BEFORE(T1."DocDate", ' + "'" + ' ' + "'" + ') as "DocDate",T1."U_VIT_TOPY",T1."DocTotal",T1."Address",T1."Address2",T2."ItemCode",T2."Dscription" from ordr T1 join rdr1 T2 on T1."DocEntry"=T2."DocEntry" where T1."Series" in (' + "1675" + ',' + "2068" + ') and T1."DocStatus"=' + "'O'" + '';
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

  var sql = 'SELECT T0."contractID" as "ContractNo",T0."subject" as "Subject",T0."BPShipAddr" as "address",T0."itemName" as "ItemName", T0."itemCode" as "ItemCode", T0."internalSN" as "internalSN", T0."U_VIT_NOSO" as "No SO",  T0."Telephone" as "tlpn", SUBSTRING(T3."DateCreate",1,10) as "DateCreate",T3."SltCode" as "SltCode","status", T0."callID" as "SC_no", SUBSTRING(T0."createDate",1,10) as "SC_date", SUBSTRING(T0."cntrctDate",1,10) as "ContractDate", T0."DocNum" as "DocNum",T5."Name" as "ContactName",SUBSTRING(T0."closeDate",1,10) as "SC_enddate", T4."SeriesName" as "SeriesName", T0."U_KS_REMARK" as "Remark", T0."Location" as "Location", T0."custmrName" as "Name" FROM OSCL T0 join scl1 T2 ON T0."callID"=T2."srvcCallID" left join oslt T3 ON T2."solutionID"=T3."SltCode" join nnm1 T4 on T0."Series" = T4."Series" left join ocpr T5 on T5."CntctCode"=T0."contctCode"  where "status" = ' + "-3" + ' order by T0."contractID"';

  connection.runQuery(res, sql);
};

exports.fh_oscl = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed FORMAT(CAST(T1."U_VIT_TOT" AS DECIMAL(20,6)) , "g16")

    var sql = 'select distinct coalesce("ItemFull", "ItemName") AS "ItemFullName","ItemCapacity", CONCAT("ItemBrand","ItemModel") as "Items", "ItemType","ItemMeasurement" from fh_oscl T4 where T4."ItemType" is not null and T4."ItemCapacity" is not null and T4."ItemSN"=' + "'" + req.query.req + "'" + '';

  connection.runQuery(res, sql);
};
