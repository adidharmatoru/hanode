var express = require('express');
var router = express.Router();
const PurchasingController = require('../controllers/PurchasingController');

router.get('/index', PurchasingController.index);

module.exports = router;