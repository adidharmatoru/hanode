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

// adjustedAmmount
// router.post('/adjustedAmmount', SalesOrderController.adjustedAmmount_create);
// router.put('/adjustedAmmount', SalesOrderController.adjustedAmmount_update);
// router.delete('/adjustedAmmount', SalesOrderController.adjustedAmmount_delete);

module.exports = router;
