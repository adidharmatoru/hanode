var express = require('express');
var router = express.Router();
const SalesQuotationController = require('../controllers/SalesQuotationController');

router.get('/', SalesQuotationController.index);
router.get('/addSQ', SalesQuotationController.addSQ);

module.exports = router;