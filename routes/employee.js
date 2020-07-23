var express = require('express');
var router = express.Router();
const EmployeeController = require('../controllers/EmployeeController');

router.get('/data', EmployeeController.data);

module.exports = router;