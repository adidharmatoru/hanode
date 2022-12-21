var express = require('express');
var router = express.Router();
const ProjectController = require('../controllers/ProjectController');

router.get('/', ProjectController.index);
router.get('/show', ProjectController.show);
router.get('/customer', ProjectController.customer);
router.get('/contact', ProjectController.contact);
router.get('/sales', ProjectController.sales);
router.get('/so', ProjectController.so);
router.get('/contactPerson', ProjectController.contactPerson);
router.get('/countProject', ProjectController.countProject);
router.get('/primarySoldItems', ProjectController.primarySoldItems);
router.get('/primarySoldItems1', ProjectController.primarySoldItems1);
router.get('/secondarySoldItems', ProjectController.secondarySoldItems);
router.get('/bastINS', ProjectController.bastINS);
router.get('/bastMNT', ProjectController.bastMNT);
router.get('/bastDO', ProjectController.bastDO);
router.get('/bastCM', ProjectController.bastCM);
router.get('/CMitems', ProjectController.CMitems);
router.get('/CM', ProjectController.CM);
router.get('/addwarranty', ProjectController.addwarranty);
router.get('/itemmonitoring', ProjectController.itemmonitoring);
router.get('/itemmonitoringPO', ProjectController.itemmonitoringPO);
router.get('/monitoring', ProjectController.monitoring);
router.get('/scallall', ProjectController.scall);

router.get('/draftPOProject', ProjectController.budgetingDraftPO);
router.get('/POProject', ProjectController.budgetingPO);
router.get('/OPProject', ProjectController.budgetingOP);
router.get('/PriceSO', ProjectController.PriceSO);
// router.get('/projectwithso', ProjectController.projectwithso);

// adjustedAmmount
// router.post('/adjustedAmmount', SalesOrderController.adjustedAmmount_create);
// router.put('/adjustedAmmount', SalesOrderController.adjustedAmmount_update);
// router.delete('/adjustedAmmount', SalesOrderController.adjustedAmmount_delete);

module.exports = router;
