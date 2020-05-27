// Reference HANA driver in the Node app and update the connection details
let hdbext = require('@sap/hdbext')

// Modify the host IP and password based on your system information
let hanaConfig = {
  host: '192.168.9.60',
  port: 30015,
  user: 'SYSTEM',
  password: 'Delta.123',
  sc: 'DEV_TEST'
}
// select from a sample table
let sql = "select * from DM_TEST"

// Execute the query and output the results
// Note: this code doesn't handle any errors (e.g. connection failures etc.,)
hdbext.createConnection(hanaConfig, function(error, client) {
  if (error) {
    return console.error(error);
  }

  client.exec(sql, function(error, rows) {
    console.log('Results:', rows)
  })
})