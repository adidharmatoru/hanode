'use strict';

const connection = require('../config/database/conn');

// start function
exports.index = function(req, res) {
  var docnum = req.query.docnum || "'%'";
  var sql = 'select "CardName", "DocNum", "NumAtCard", "DocDate", "DocCur", "OwnerCode", round("DocTotal", 2) as "DocTotal" from ordr a where "DocNum" like ' + docnum

  connection.runQuery(res, sql);
};

// start function
exports.adjustedAmmount_create = function(req, res) {
  var sql = ''

  // open hana connection
  connection.runQuery(res, sql);
};

// start function
exports.adjustedAmmount_update = function(req, res) {
  var docnum = req.body.docnum;
  var doctotal = req.body.doctotal;
  var sql = 'update ordr set "DocTotal" = ' + doctotal + ' where "DocNum" like ' + docnum

  // open hana connection
  connection.runQuery(res, sql);
};

// start function
exports.adjustedAmmount_delete = function(req, res) {
  var docnum = req.body.docnum;
  var sql = 'delete from ordr where "DocNum" like ' + docnum

  // open hana connection
  connection.runQuery(res, sql);
};

exports.close = function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select "DocEntry", "DocNum" from ordr where "DocStatus" = ' + "'" + 'O' + "'" + ' and "DocNum" in  (' + req.query.code + ')';

  connection.runQuery(res, sql);
};
