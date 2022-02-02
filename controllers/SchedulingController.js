'use strict';

const connection = require('../config/database/conn');

exports.schedulingSN = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed FORMAT(CAST(T1."U_VIT_TOT" AS DECIMAL(20,6)) , "g16")

    var sql = 'select T0."ContractID" as "ContractID", T1."ItemName" as "ItemName", T1."InternalSN" as "SerialNum", T2."status" as "Status" from octr T0 join ctr1 T1 on T0."ContractID"=T1."ContractID" join oins T2 on T1."InsID" = T2."insID" where  T1."TermDate" is null and now() < T1."EndDate" and T2."status" = ' + "'" + 'A' + "'" + '';

  connection.runQuery(res, sql);
};
