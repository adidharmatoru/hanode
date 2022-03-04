var express = require('express');
var router = express.Router();
const MarketingController = require('../controllers/MarketingController');

router.get('/', MarketingController.index);
router.get('/show', MarketingController.show);
router.get('/customer', MarketingController.customer);
router.get('/contact', MarketingController.contact);
router.get('/so', MarketingController.so);
router.get('/docTotal', MarketingController.docTotal);
router.get('/contactPerson', MarketingController.contactPerson);
router.get('/countProject', MarketingController.countProject);
router.get('/scon', MarketingController.scon);
router.get('/sconDetail', MarketingController.sconDetail);
router.get('/items', MarketingController.itemCode);
router.get('/teknisi', MarketingController.teknisi);
router.get('/CorrectiveMaintenance', MarketingController.CorrectiveMaintenance);
router.get('/ServiceContract', MarketingController.ServiceContract);
router.get('/ServiceContractTerm', MarketingController.ServiceContractTerm);
router.get('/SconItem', MarketingController.SconItem);
router.get('/Scall', MarketingController.Scall);
router.get('/ScallDetail', MarketingController.ScallDetail);
router.get('/Inv', MarketingController.Inv);
router.get('/serialNum', MarketingController.serialNum);
router.get('/attachment', MarketingController.attachment);
router.get('/scallcreated', MarketingController.scallcreated);
router.get('/scalldone', MarketingController.reportscalldone);

module.exports = router;
