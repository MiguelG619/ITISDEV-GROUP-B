const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller.js');
const loginController = require('../controllers/loginController.js');
const signupController = require('../controllers/signupController.js');

router.get('/', controller.getIndex);
router.get('/login', loginController.getLogIn);
router.get('/signup', signupController.getSignUp);
router.post('/signup', signupController.postSignUp);

module.exports = router;