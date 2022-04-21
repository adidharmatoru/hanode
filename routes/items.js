var express = require('express');
var router = express.Router();
const ItemsController = require('../controllers/ItemsController');

router.get('/masterItems',ItemsController.masterItems);
router.get('/itemsgroup',ItemsController.itemsgroup);
router.get('/equipmentcard',ItemsController.equipmentcard);
router.get('/itemsAll',ItemsController.itemsAll);


module.exports = router;
