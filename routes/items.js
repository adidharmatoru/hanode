var express = require('express');
var router = express.Router();
const ItemsController = require('../controllers/ItemsController');

router.get('/masterItems',ItemsController.masterItems);
router.get('/itemsgroup',ItemsController.itemsgroup);


module.exports = router;
