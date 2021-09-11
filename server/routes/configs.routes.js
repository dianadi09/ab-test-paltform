const express = require('express');
const router = express.Router();
const Configs = require('../controllers/configs.controller')

router.get('/', Configs.getConfigs)
router.get('/:id', Configs.getConfigs)
router.post('/create', Configs.createConfigs)
router.post('/update/:id', Configs.updateConfigs)

module.exports = router;