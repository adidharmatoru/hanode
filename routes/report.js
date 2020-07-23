var express = require('express');
var router = express.Router();
const ReportController = require('../controllers/ReportController');

router.get('/SQ', ReportController.SQ);
router.get('/itemGroupsSold', ReportController.itemGroupsSold);
router.get('/quotationBackLog', ReportController.quotationBackLog);
router.get('/openServiceCall', ReportController.openServiceCall);

module.exports = router;