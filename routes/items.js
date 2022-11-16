var express = require('express');
var router = express.Router();
const ItemsController = require('../controllers/ItemsController');

router.get('/masterItems',ItemsController.masterItems);
router.get('/itemsgroup',ItemsController.itemsgroup);
router.get('/equipmentcard',ItemsController.equipmentcard);
router.get('/ecValidasi',ItemsController.ecValidasi);
router.get('/itemsAll',ItemsController.itemsAll);
router.get('/item',ItemsController.itemName);
router.get('/serialNumDetail',ItemsController.ecDetail);
router.get('/serialNumScall',ItemsController.ecScall);
router.get('/serialNumContract',ItemsController.ecScon);
router.get('/serialNumTransaction',ItemsController.ecTransaction);
router.get('/fh_osclvalidation',ItemsController.fh_osclvalidation);
router.get('/locationwhs',ItemsController.locationwhs);
router.get('/materialbantu',ItemsController.materialbantu);
router.get('/itemsProject',ItemsController.itemsProject);


module.exports = router;
