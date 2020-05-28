var express = require('express');
var router = express.Router();
const SalesController = require('../controllers/SalesController');

router.get('/reportSQ', SalesController.reportSQ);

module.exports = router;