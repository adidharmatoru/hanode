var express = require('express');
var router = express.Router();
const SalesQuotationController = require('../controllers/SalesQuotationController');

router.get('/', SalesQuotationController.index);

module.exports = router;