var express = require('express');
var router = express.Router();
const ReportController = require('../controllers/ReportController');

router.get('/itemQty', ReportController.itemQty);
router.get('/perWarehouse', ReportController.perWarehouse);
router.get('/itemGroupsSold', ReportController.itemGroupsSold);
router.get('/quotationBackLog', ReportController.quotationBackLog);
router.get('/maintenanceBackLog', ReportController.maintenanceBackLog);
router.get('/maintenanceNextBackLog', ReportController.maintenanceNextBackLog);
router.get('/maintenanceNextServiceBackLog', ReportController.maintenanceNextServiceBackLog);
router.get('/inhsBackLog', ReportController.inhsBackLog);
router.get('/inhsNextBackLog', ReportController.inhsNextBackLog);
router.get('/onstBackLog', ReportController.onstBackLog);
router.get('/onclBackLog', ReportController.onclBackLog);
router.get('/contBackLog', ReportController.contBackLog);
router.get('/otherBackLog', ReportController.otherBackLog);
router.get('/openServiceCall', ReportController.openServiceCall);
router.get('/outstandingSQ', ReportController.outstandingSQ);
router.get('/outstandingSQbyEmpID', ReportController.outstandingSQbyEmpID);
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
router.get('/documentReport', ReportController.documentReport);
router.get('/outstandingBigSales', ReportController.outstandingBigSales);
router.get('/purchaseOrderInternalReport', ReportController.purchaseOrderInternalReport);
router.get('/serialNumberService', ReportController.serialNumberService);
router.get('/pdcaFinanceServices', ReportController.pdcaFinanceServices);
router.get('/seriesnameSOproject', ReportController.seriesnameSOproject);
router.get('/alternateItemReport', ReportController.alternateItemReport);
router.get('/itemReadyForSales', ReportController.itemReadyForSales);
router.get('/itemReadyPO', ReportController.itemReadyPO);
router.get('/itemReadySO', ReportController.itemReadySO);
router.get('/itemReadyWarehouse', ReportController.itemReadyWarehouse);
router.get('/itemReadyWarehousetest', ReportController.itemReadyWarehousetest);
router.get('/sqCPRecapProgressOpenbyYear', ReportController.sqCPRecapProgressOpenbyYear);
router.get('/pdcaSalesServices', ReportController.pdcaSalesServices);

module.exports = router;
