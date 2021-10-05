var express = require('express');
var router = express.Router();
const MarketingController = require('../controllers/MarketingController');

router.get('/', MarketingController.index);
router.get('/show', MarketingController.show);
router.get('/customer', MarketingController.customer);
router.get('/contact', MarketingController.contact);
router.get('/sales', MarketingController.sales);
router.get('/so', MarketingController.so);
router.get('/contactPerson', MarketingController.contactPerson);
router.get('/countProject', MarketingController.countProject);
router.get('/scon', MarketingController.scon);
router.get('/items', MarketingController.items);
router.get('/serialNumber', MarketingController.serialNumber);

// adjustedAmmount
// router.post('/adjustedAmmount', SalesOrderController.adjustedAmmount_create);
// router.put('/adjustedAmmount', SalesOrderController.adjustedAmmount_update);
// router.delete('/adjustedAmmount', SalesOrderController.adjustedAmmount_delete);

module.exports = router;
