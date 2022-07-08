var express = require('express');
var router = express.Router();
const ItemsController = require('../controllers/ItemsController');

router.get('/masterItems',ItemsController.masterItems);
router.get('/itemsgroup',ItemsController.itemsgroup);
router.get('/equipmentcard',ItemsController.equipmentcard);
router.get('/itemsAll',ItemsController.itemsAll);
router.get('/item',ItemsController.itemName);
router.get('/serialNumDetail',ItemsController.ecDetail);
router.get('/serialNumScall',ItemsController.ecScall);
router.get('/serialNumContract',ItemsController.ecScon);
router.get('/serialNumTransaction',ItemsController.ecTransaction);


module.exports = router;
