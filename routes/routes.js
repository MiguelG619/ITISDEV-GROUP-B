const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller.js');
const loginController = require('../controllers/loginController.js');
const signupController = require('../controllers/signupController.js');
const homeController = require('../controllers/homeController.js');
const purchasingController = require('../controllers/purchasingController');

const validation = require('../helpers/validation.js');

router.get('/', controller.getIndex);
router.get('/login', loginController.getLogIn);
router.post('/login', loginController.postLogIn);
router.get('/signup', signupController.getSignUp);
router.post('/signup', validation.signupValidation(), signupController.postSignUp);
router.get('/getCheckEmail', signupController.getCheckEmail);

router.get('/home', homeController.getHome);

router.get('/purchasedOrders', purchasingController.getAllPurchasedOrders);


module.exports = router;