var express = require('express');
var router = express.Router();
const DeliveryOrderController = require('../controllers/DeliveryOrderController');

router.get('/', DeliveryOrderController.index);
router.get('/close', DeliveryOrderController.close);
router.get('/findDocEntry', DeliveryOrderController.findDocEntry);
router.get('/trackingSN', DeliveryOrderController.trackingserialNumber);
router.get('/cekwarranty', DeliveryOrderController.cekwarranty);
router.get('/serialnumber', DeliveryOrderController.serialnumber);
router.get('/serialNum', DeliveryOrderController.serialNum);
router.get('/detaildelivery', DeliveryOrderController.detaildelivery);

// adjustedAmmount
// router.post('/adjustedAmmount', SalesOrderController.adjustedAmmount_create);
// router.put('/adjustedAmmount', SalesOrderController.adjustedAmmount_update);
// router.delete('/adjustedAmmount', SalesOrderController.adjustedAmmount_delete);

module.exports = router;
