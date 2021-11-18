var express = require('express');
var router = express.Router();
const ItemsController = require('../controllers/ItemsController');

router.get('/masterItems',ItemsController.masterItems);


module.exports = router;
