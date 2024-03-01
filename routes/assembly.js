var express = require('express');
var router = express.Router();
const AssemblyController = require('../controllers/AssemblyController');

router.get('/productionorder', AssemblyController.productionorder);
router.get('/detailproductionorder', AssemblyController.detailproductionorder);
router.get('/billofmaterial', AssemblyController.billofmaterial);
router.get('/billofmaterialdetail', AssemblyController.billofmaterialdetail);
router.get('/itemsap', AssemblyController.itemsap);
router.get('/codeproject', AssemblyController.codeproject);
router.get('/itemmaterialsap', AssemblyController.itemmaterialsap);
router.get('/whscode', AssemblyController.whscode);
router.get('/validasistatus', AssemblyController.validasistatus);
module.exports = router;
