var express = require('express');
var router = express.Router();
const SchedulingController = require('../controllers/SchedulingController');

router.get('/serialNum', SchedulingController.scheduling);

module.exports = router;
