var express = require('express');
var router = express.Router();
const ServiceCallController = require('../controllers/ServiceCallController');

router.get('/', ServiceCallController.index);
router.get('/close', ServiceCallController.close);

// adjustedAmmount
// router.post('/adjustedAmmount', SalesOrderController.adjustedAmmount_create);
// router.put('/adjustedAmmount', SalesOrderController.adjustedAmmount_update);
// router.delete('/adjustedAmmount', SalesOrderController.adjustedAmmount_delete);

module.exports = router;
