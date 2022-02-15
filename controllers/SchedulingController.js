'use strict';

const connection = require('../config/database/conn');

exports.serialNumContract = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed FORMAT(CAST(T1."U_VIT_TOT" AS DECIMAL(20,6)) , "g16")

    var sql = 'select T0."ContractID" as "ContractID",T0."CstmrName" as "CustomerName",T2."instLction" as "Location", T2."contactCod" as "Contact",T0."Descriptio" as "NomorPO",T1."ItemName" as "ItemName",T1."ItemCode" as "ItemCode", T1."InternalSN" as "SerialNum", SUBSTRING(T0."StartDate",1,10) as "StartDate", SUBSTRING(T0."EndDate",1,10) as "EndDate",T0."CntrcTmplt" as "ContractTemplate",T0."U_FH_BU" as "BackUp", T0."U_FH_BD_BASR" as "BA", T0."U_FH_BD_SR" as "SR", T0."U_FH_BD_WCN" as "WCN",T0."U_FH_BD_ERGS" as "ERGS", T0."U_FH_BD_ESSAR" as "ESSAR", T0."U_FH_BD_MIGO" as "MIGO",T0."U_FH_BD_SES" as "SES", T0."U_FH_BD_OTHER" as "OTHER", T0."Remarks2"as "Remarks", T0."U_FH_TERM" as "TOP",T2."status" as "Status", T0."CntrcTmplt" as "ContractTemplate", T3."Name" as "ContactName", T3."Tel1" as "Telpn" from octr T0 join ctr1 T1 on T0."ContractID"=T1."ContractID" join oins T2 on T1."InsID" = T2."insID" join ocpr T3 on T2."contactCod" = T3."CntctCode" where T1."TermDate" is null and now() < T1."EndDate" and T2."status" = ' + "'" + 'A' + "'" + ' and T0."CntrcTmplt" in (' + "'" + 'Basic' + "'" + ',' + "'" + 'Advance' + "'" + ',' + "'" + 'Premium' + "'" + ',' + "'" + 'BasicPlus' + "'" + ')';

  connection.runQuery(res, sql);
};

exports.serialNumContractLegacy = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed FORMAT(CAST(T1."U_VIT_TOT" AS DECIMAL(20,6)) , "g16")

    var sql = 'select T0."ContractID" as "ContractID",T0."CstmrName" as "CustomerName",T2."instLction" as "Location", T2."contactCod" as "Contact",T0."Descriptio" as "NomorPO",T1."ItemName" as "ItemName",T1."ItemCode" as "ItemCode", T1."InternalSN" as "SerialNum", SUBSTRING(T0."StartDate",1,10) as "StartDate", SUBSTRING(T0."EndDate",1,10) as "EndDate",T0."CntrcTmplt" as "ContractTemplate",T0."U_FH_BU" as "BackUp", T0."U_FH_BD_BASR" as "BA", T0."U_FH_BD_SR" as "SR", T0."U_FH_BD_WCN" as "WCN",T0."U_FH_BD_ERGS" as "ERGS", T0."U_FH_BD_ESSAR" as "ESSAR", T0."U_FH_BD_MIGO" as "MIGO",T0."U_FH_BD_SES" as "SES", T0."U_FH_BD_OTHER" as "OTHER", T0."Remarks2"as "Remarks", T0."U_FH_TERM" as "TOP",T2."status" as "Status", T0."CntrcTmplt" as "ContractTemplate", T3."Name" as "ContactName", T3."Tel1" as "Telpn" from octr T0 join ctr1 T1 on T0."ContractID"=T1."ContractID" join oins T2 on T1."InsID" = T2."insID" join ocpr T3 on T2."contactCod" = T3."CntctCode" where  T1."TermDate" is null and now() > T1."EndDate" and T2."status" = ' + "'" + 'A' + "'" + ' and T0."CntrcTmplt" in (' + "'" + 'Basic' + "'" + ',' + "'" + 'Advance' + "'" + ',' + "'" + 'Premium' + "'" + ',' + "'" + 'BasicPlus' + "'" + ')';

  connection.runQuery(res, sql);
};

exports.serialNumOnCall = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed FORMAT(CAST(T1."U_VIT_TOT" AS DECIMAL(20,6)) , "g16")

    var sql = 'select T0."ContractID" as "ContractID", T1."ItemName" as "ItemName",T0."CstmrName" as "CustomerName",T0."Descriptio" as "NomorPO",T2."instLction" as "Location",T1."ItemCode" as "ItemCode",T0."Remarks2"as "Remarks", T0."U_FH_TERM" as "TOP", T1."InternalSN" as "SerialNum", T2."status" as "Status", T0."CntrcTmplt" as "ContractTemplate", T3."Name" as "ContactName", T3."Tel1" as "Telpn" from octr T0 join ctr1 T1 on T0."ContractID"=T1."ContractID" join oins T2 on T1."InsID" = T2."insID" join ocpr T3 on T2."contactCod" = T3."CntctCode" where  T1."TermDate" is null and now() < T1."EndDate" and T2."status" = ' + "'" + 'A' + "'" + ' and T0."CntrcTmplt" in (' + "'" + 'OnCall' + "'" + ')';

  connection.runQuery(res, sql);
};

exports.serialNumOnCallLegacy = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed FORMAT(CAST(T1."U_VIT_TOT" AS DECIMAL(20,6)) , "g16")

    var sql = 'select T0."ContractID" as "ContractID", T1."ItemName" as "ItemName",T0."CstmrName" as "CustomerName",T0."Descriptio" as "NomorPO",T2."instLction" as "Location",T1."ItemCode" as "ItemCode",T0."Remarks2"as "Remarks", T0."U_FH_TERM" as "TOP", T1."InternalSN" as "SerialNum", T2."status" as "Status", T0."CntrcTmplt" as "ContractTemplate", T3."Name" as "ContactName", T3."Tel1" as "Telpn" from octr T0 join ctr1 T1 on T0."ContractID"=T1."ContractID" join oins T2 on T1."InsID" = T2."insID" join ocpr T3 on T2."contactCod" = T3."CntctCode"  where  T1."TermDate" is null and now() > T1."EndDate" and T2."status" = ' + "'" + 'A' + "'" + ' and T0."CntrcTmplt" in (' + "'" + 'OnCall' + "'" + ')';

  connection.runQuery(res, sql);
};

exports.serialNumTerminated = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed FORMAT(CAST(T1."U_VIT_TOT" AS DECIMAL(20,6)) , "g16")

    var sql = 'select T0."ContractID" as "ContractID",T0."CstmrName" as "CustomerName",T2."instLction" as "Location", T2."contactCod" as "Contact",T0."Descriptio" as "NomorPO",T1."ItemName" as "ItemName",T1."ItemCode" as "ItemCode", T1."InternalSN" as "SerialNum", SUBSTRING(T0."StartDate",1,10) as "StartDate",SUBSTRING(T0."TermDate",1,10) as "TermDate", SUBSTRING(T0."EndDate",1,10) as "EndDate",T0."CntrcTmplt" as "ContractTemplate",T0."U_FH_BU" as "BackUp", T0."U_FH_BD_BASR" as "BA", T0."U_FH_BD_SR" as "SR", T0."U_FH_BD_WCN" as "WCN",T0."U_FH_BD_ERGS" as "ERGS", T0."U_FH_BD_ESSAR" as "ESSAR", T0."U_FH_BD_MIGO" as "MIGO",T0."U_FH_BD_SES" as "SES", T0."U_FH_BD_OTHER" as "OTHER", T0."Remarks2"as "Remarks", T0."U_FH_TERM" as "TOP",T2."status" as "Status", T0."CntrcTmplt",T3."Name" as "ContactName", T3."Tel1" as "Telpn" from octr T0 join ctr1 T1 on T0."ContractID"=T1."ContractID" join oins T2 on T1."InsID" = T2."insID" join ocpr T3 on T2."contactCod" = T3."CntctCode" where  T1."TermDate" is not null and now() > T1."EndDate" and T2."status" = ' + "'" + 'A' + "'" + ' and T0."CntrcTmplt" in (' + "'" + 'Basic' + "'" + ',' + "'" + 'Advance' + "'" + ',' + "'" + 'Premium' + "'" + ',' + "'" + 'BasicPlus' + "'" + ',' + "'" + 'OnCall' + "'" + ')';

  connection.runQuery(res, sql);
};

exports.fh_oscl = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed FORMAT(CAST(T1."U_VIT_TOT" AS DECIMAL(20,6)) , "g16")

    var sql = 'select distinct T4."ItemType" as "Model",T4."ItemCapacity" as "Capacity",T4."ItemName" as "Item", T4."ItemCode" as "ItemCode" from fh_oscl T4 where T4."ItemType" is not null and T4."ItemCapacity" is not null';

  connection.runQuery(res, sql);
};
