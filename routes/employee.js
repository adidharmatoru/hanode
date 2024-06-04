var express = require('express');
var router = express.Router();
const EmployeeController = require('../controllers/EmployeeController');

router.get('/data', EmployeeController.data);
router.get('/dataemployee', EmployeeController.dataemployee);
router.get('/salesemployee', EmployeeController.salesemployee);

module.exports = router;
