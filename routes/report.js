var express = require('express');
var router = express.Router();
const ReportController = require('../controllers/ReportController');

router.get('/itemQty', ReportController.itemQty);
router.get('/perWarehouse', ReportController.perWarehouse);
router.get('/itemGroupsSold', ReportController.itemGroupsSold);
router.get('/quotationBackLog', ReportController.quotationBackLog);
router.get('/openServiceCall', ReportController.openServiceCall);
router.get('/outstandingSQ', ReportController.outstandingSQ);
router.get('/outstandingSO', ReportController.outstandingSO);
router.get('/outstandingDO', ReportController.outstandingDO);
router.get('/purchaseOrderPerProject', ReportController.purchaseOrderPerProject);
router.get('/salesOrderPerProject', ReportController.salesOrderPerProject);
router.get('/listingPenawaran', ReportController.listingPenawaran);
router.get('/monthlyIncome', ReportController.monthlyIncome);
router.get('/monthlyOutcome', ReportController.monthlyOutcome);
router.get('/potentialMonthlyIncome', ReportController.potentialMonthlyIncome);
router.get('/potentialMonthlyOutcome', ReportController.potentialMonthlyOutcome);
router.get('/pdcaProject', ReportController.pdcaProject);
router.get('/pdcaSales', ReportController.pdcaSales);

module.exports = router;
