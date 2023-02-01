var express = require('express');
var router = express.Router();
const SalesController = require('../controllers/SalesController');

router.get('/DeliveryGEdanPhilips', SalesController.DeliveryGEdanPhilips);
router.get('/DeliveryRS', SalesController.DeliveryRS);
router.get('/DeliveryRSContract', SalesController.DeliveryRSContract);

module.exports = router;
