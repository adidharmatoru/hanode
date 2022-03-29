var express = require('express');
var router = express.Router();
const DeliveryOrderController = require('../controllers/DeliveryOrderController');

router.get('/', DeliveryOrderController.index);
router.get('/close', DeliveryOrderController.close);
router.get('/findDocEntry', DeliveryOrderController.findDocEntry);
router.get('/trackingSN', DeliveryOrderController.trackingserialNumber);

// adjustedAmmount
// router.post('/adjustedAmmount', SalesOrderController.adjustedAmmount_create);
// router.put('/adjustedAmmount', SalesOrderController.adjustedAmmount_update);
// router.delete('/adjustedAmmount', SalesOrderController.adjustedAmmount_delete);

module.exports = router;
