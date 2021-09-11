const express = require('express');
const router = express.Router();
const History = require('../controllers/history.controller')

router.get('/', History.getHistory)

module.exports = router;