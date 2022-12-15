var express = require('express');
var router = express.Router();
const AssemblyController = require('../controllers/AssemblyController');

router.get('/productionorder', AssemblyController.productionorder);
router.get('/detailproductionorder', AssemblyController.detailproductionorder);
router.get('/billofmaterial', AssemblyController.detailproductionorder);
router.get('/billofmaterialdetail', AssemblyController.billofmaterialdetail);
module.exports = router;
