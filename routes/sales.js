var express = require('express');
var router = express.Router();
const SalesController = require('../controllers/SalesController');

router.get('/DeliveryGEdanPhilips', SalesController.DeliveryGEdanPhilips);

module.exports = router;
