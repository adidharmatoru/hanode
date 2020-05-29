'use strict';

var response = require('../config/res');
var connection = require('../config/database/conn');
var hdbext = require('@sap/hdbext');

// start function
exports.SQ = function(req, res, next) {
  var sql = 'select * from DM_TEST'

  // open hana connection
  hdbext.createConnection(connection, function(error, client) {
    if (error) {
      response.err(error, res);
    }

    // exec query
    client.exec(sql, function(error, rows) {
      if (error) {
        response.err(error, res);
      } else {
        response.success(rows, res);
      }
    })
  });
};