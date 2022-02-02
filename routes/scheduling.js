var express = require('express');
var router = express.Router();
const SchedulingController = require('../controllers/SchedulingController');

router.get('/data', SchedulingController.scheduling);

module.exports = router;
