'use strict';

var connection = require('../config/database/conn');

exports.index = function(req, res) {
  var sql = 'select * from DM_TEST'
  connection.runQuery(res, sql);
};