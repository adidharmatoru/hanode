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
/* GET home page. */
router.get('/', function(req, res, next) {

  hdbext.createConnection(hanaConfig, function(error, client) {
    if (error) {
      return console.error(error);
    }

    client.exec(sql, function(error, rows) {
      res.render('index', {
        title: 'Sample Node.js on HANA express',
        datarow: rows
      });
    })
  })
});

module.exports = router;