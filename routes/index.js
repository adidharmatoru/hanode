var express = require('express');
var hdbext = require('@sap/hdbext')
var router = express.Router();
var hanaConfig = {
  host: '192.168.9.60',
  port: 30015,
  user: 'SYSTEM',
  password: 'Delta.123',
  cs: 'DEV_TEST'
}
var sql = "select * from DM_TEST"
router.get('/sq', function(req, res, next) {

  hdbext.createConnection(hanaConfig, function(error, client) {
    if (error) {
      return console.error(error);
    }

    client.exec(sql, function(error, rows) {
      res.header("Content-Type", 'application/json');
      res.send(JSON.stringify(rows, null, 4));
    })
  })
});

module.exports = router;