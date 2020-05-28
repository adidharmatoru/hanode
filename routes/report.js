var express = require('express');
var router = express.Router();
const ReportController = require('../controllers/ReportController');

router.get('/SQ', ReportController.SQ);

module.exports = router;