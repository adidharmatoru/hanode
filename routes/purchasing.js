var express = require('express');
var router = express.Router();
const PurchasingController = require('../controllers/PurchasingController');

router.get('/index', PurchasingController.index);
router.get('/outstandingpr', PurchasingController.outstandingpr);
router.get('/outstandingpo', PurchasingController.outstandingpo);

module.exports = router;
