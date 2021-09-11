const express = require('express');
const router = express.Router();
const Tests = require('../controllers/tests.controller')

router.get('/', Tests.getTests)
router.get('/:id', Tests.getTests)
router.post('/create', Tests.createTest)
router.post('/update/:id', Tests.updateTest)
router.delete('/finish/:id', Tests.finishTest)

module.exports = router;