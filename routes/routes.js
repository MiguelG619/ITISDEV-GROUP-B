const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller.js');

router.get('/', controller.getIndex);

module.exports = router;