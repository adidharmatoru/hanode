var express = require('express');
var router = express.Router();
const ReportingController = require('../controllers/ReportingController');

router.get('/solution', ReportingController.solution);

module.exports = router;
