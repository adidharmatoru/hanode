var express = require('express');
var router = express.Router();
const CorrectiveController = require('../controllers/CorrectiveController');

router.get('/pdcacorrective', CorrectiveController.corrective);
router.get('/correctiveDetail', CorrectiveController.correctiveDetail);
router.get('/relationscall', CorrectiveController.relationscall);
router.get('/relationshipscall', CorrectiveController.relationshipscall);
router.get('/salesQuotation', CorrectiveController.salesQuotation);
router.get('/salesOrder', CorrectiveController.salesOrder);
router.get('/Inv', CorrectiveController.Inv);
router.get('/delivery', CorrectiveController.delivery);
router.get('/deliveryktb', CorrectiveController.deliveryktb);
router.get('/downpayment', CorrectiveController.DownPayment);
router.get('/scallinhouse', CorrectiveController.scallinhouse);
router.get('/callid', CorrectiveController.callid);
router.get('/sqdariso', CorrectiveController.sqdariso);
module.exports = router;
