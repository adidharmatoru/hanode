var express = require('express');
var router = express.Router();
const AssemblyController = require('../controllers/AssemblyController');

router.get('/productionorder', AssemblyController.productionorder);
router.get('/detailproductionorder', AssemblyController.detailproductionorder);
module.exports = router;
