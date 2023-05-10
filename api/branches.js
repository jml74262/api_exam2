const BranchController = require('../controller/branches');
const express = require('express');
const router = express.Router();

router.get('/all', BranchController.findAllBranches);

router.get('/allGeoBranches', BranchController.findAllGeoBranches);

router.get('/:id', BranchController.findbyId);

router.post('/add', BranchController.addBranch);

router.post('/updateBranchLocation', BranchController.updateBranchLocation);

router.post('/updBranchLocation', BranchController.updBranchLocation);

router.get('byName/:name', BranchController.findByName);

router.post('/removebyid/:id', BranchController.removeById);

module.exports = router;