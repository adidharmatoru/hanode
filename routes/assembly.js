var express = require('express');
var router = express.Router();
const AssemblyController = require('../controllers/AssemblyController');

router.get('/productionorder', AssemblyController.productionorder);
router.get('/detailproductionorder', AssemblyController.detailproductionorder);
router.get('/billofmaterial', AssemblyController.billofmaterial);
router.get('/billofmaterialdetail', AssemblyController.billofmaterialdetail);
router.get('/itemsap', AssemblyController.itemsap);
module.exports = router;
