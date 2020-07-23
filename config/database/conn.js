var response = require('../res');
const hdbext = require('@sap/hdbext')

// db credential
exports.con = {
  host: '192.168.9.60',
  port: 30015,
  user: 'SYSTEM',
  password: 'Delta.123',
  cs: 'DB_DELTASINDO'
}

// run query
exports.runQuery = function(res, sql) {
  hdbext.createConnection(this.con, function(error, client) {
    // check if connection error
    if (error) {
      response.err(error, res);
    } else {
      // exec query
      client.exec(sql, function(error, rows) {
        //catch the error in query
        if (error) {
          response.err(error, res);
        } else {
          if (rows < 1) {
            response.notFound(res);
          } else {
            response.success(rows, res);
          }
        }
      })
    }
  })
}