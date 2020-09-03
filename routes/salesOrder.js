var express = require('express');
var router = express.Router();
const SalesOrderController = require('../controllers/SalesOrderController');

router.get('/', SalesOrderController.index);
router.get('/close', SalesOrderController.close);

// adjustedAmmount
// router.post('/adjustedAmmount', SalesOrderController.adjustedAmmount_create);
// router.put('/adjustedAmmount', SalesOrderController.adjustedAmmount_update);
// router.delete('/adjustedAmmount', SalesOrderController.adjustedAmmount_delete);

module.exports = router;
