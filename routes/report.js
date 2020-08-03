var express = require('express');
var router = express.Router();
const ReportController = require('../controllers/ReportController');

router.get('/itemQty', ReportController.itemQty);
router.get('/itemGroupsSold', ReportController.itemGroupsSold);
router.get('/quotationBackLog', ReportController.quotationBackLog);
router.get('/openServiceCall', ReportController.openServiceCall);
router.get('/outstandingSQ', ReportController.outstandingSQ);
router.get('/outstandingSO', ReportController.outstandingSO);
router.get('/outstandingDO', ReportController.outstandingDO);
router.get('/purchaseOrderPerProject', ReportController.purchaseOrderPerProject);
router.get('/salesOrderPerProject', ReportController.salesOrderPerProject);

module.exports = router;