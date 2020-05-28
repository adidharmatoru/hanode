var express = require('express');
var router = express.Router();
const SalesController = require('../controllers/SalesController');

router.get('/', SalesController.index);

module.exports = router;