'use strict';

var response = require('../config/res');
var connection = require('../config/database/conn');
var hdbext = require('@sap/hdbext');

// start function
exports.SQ = function(req, res, next) {
  var sql = 'select * from DM_TEST'

  connection.runQuery(res, sql);
};