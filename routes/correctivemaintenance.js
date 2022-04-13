var express = require('express');
var router = express.Router();
const CorrectiveController = require('../controllers/CorrectiveController');

router.get('/pdcacorrective', CorrectiveController.corrective);
router.get('/salesQuotation', CorrectiveController.salesQuotation);
module.exports = router;
