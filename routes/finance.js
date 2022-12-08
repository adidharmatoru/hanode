var express = require('express');
var router = express.Router();
const FinanceController = require('../controllers/FinanceController');

router.get('/profitandlossOGdetail', FinanceController.profitandlossOGdetail);
router.get('/profitandlossOG', FinanceController.profitandlossOG);
router.get('/profitandlossSO', FinanceController.profitandlossSO);
router.get('/profitandlossSOdetail', FinanceController.profitandlossSOdetail);

module.exports = router;
