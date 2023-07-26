var express = require('express');
var router = express.Router();
const PurchasingController = require('../controllers/PurchasingController');

router.get('/index', PurchasingController.index);
router.get('/outstandingpr', PurchasingController.outstandingpr);
router.get('/outstandingpo', PurchasingController.outstandingpo);
router.get('/outstandingdraft', PurchasingController.outstandingdraft);
router.get('/close', PurchasingController.close);

module.exports = router;
