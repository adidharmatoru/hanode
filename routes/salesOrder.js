var express = require('express');
var router = express.Router();
const SalesOrderController = require('../controllers/SalesOrderController');

router.get('/', SalesOrderController.index);
router.get('/close', SalesOrderController.close);

// adjustedAmmount
router.get('/adjustedAmount', SalesOrderController.selectAdjustedAmount);
router.post('/adjustedAmount', SalesOrderController.createAdjustedAmount);
router.post('/adjustedAmount/delete', SalesOrderController.deleteAdjustedAmount);
// router.put('/adjustedAmmount', SalesOrderController.adjustedAmmount_update);

module.exports = router;
