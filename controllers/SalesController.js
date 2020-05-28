'use strict';

var response = require('../config/res');
var connection = require('../config/database/conn');
var hdbext = require('@sap/hdbext');

exports.reportSQ = function(req, res, next) {
  var sql = "select * from DM_TEST"
  hdbext.createConnection(connection, function(error, client) {
    if (error) {
      return console.error(error);
    }

    client.exec(sql, function(error, rows) {
      response.ok(rows, res);
    })
  });
};