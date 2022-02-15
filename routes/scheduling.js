var express = require('express');
var router = express.Router();
const SchedulingController = require('../controllers/SchedulingController');

router.get('/serialNumContract', SchedulingController.serialNumContract);
router.get('/serialNumContractLegacy', SchedulingController.serialNumContractLegacy);
router.get('/serialNumOnCall', SchedulingController.serialNumOnCall);
router.get('/serialNumOnCallLegacy', SchedulingController.serialNumOnCallLegacy);
router.get('/serialNumTerminated', SchedulingController.serialNumTerminated);
router.get('/fh_oscl', SchedulingController.fh_oscl);

module.exports = router;
