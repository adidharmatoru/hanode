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