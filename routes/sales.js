var express = require('express');
var router = express.Router();
const SalesController = require('../controllers/SalesController');

router.get('/DeliveryGEdanPhilips', SalesController.DeliveryGEdanPhilips);
router.get('/DeliveryGEdanPhilipsDetail', SalesController.DeliveryGEdanPhilipsDetail);
router.get('/DeliveryRS', SalesController.DeliveryRS);
router.get('/DeliveryRSContract', SalesController.DeliveryRSContract);
router.get('/sqss', SalesController.sqss);
router.get('/sqssdetail', SalesController.sqssdetail);
router.get('/servicecallsqss', SalesController.inhousesc);

module.exports = router;
