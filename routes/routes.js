const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller.js');
const loginController = require('../controllers/loginController.js');
const signupController = require('../controllers/signupController.js');
const purchasingController = require('../controllers/purchasingController.js');
const managerController = require("../controllers/managerController.JS");
const inventoryController = require("../controllers/inventoryController.JS");
const cashierController = require("../controllers/cashierController.JS");



const validation = require('../helpers/validation.js');

router.get('/', controller.getIndex);
router.get('/login', loginController.getLogIn);
router.post('/login', loginController.postLogIn);
router.get('/signup', signupController.getSignUp);
router.post('/signup', validation.signupValidation(), signupController.postSignUp);
router.get('/getCheckEmail', signupController.getCheckEmail);


// Cashier routes
router.get('/cashier/cashierOrders', cashierController.getAllMenuItems);

// Purchasing routes
router.get('/purchasing/purchasedIngredients', purchasingController.getAllPurchasedIngredients);
router.get('/purchasing/purchased', purchasingController.getPurchasedIngredientsToList);
router.get('/purchasing/toPurchase', purchasingController.getToPurchasedIngredients);
router.get('/purchasing/purchasedOrders', purchasingController.getAllPurchasedOrders);
router.get('/purchasing/purchasedOrdersDetails/:id', purchasingController.getPurchasedOrderDetails);
router.post('/purchasing/addPurchasedIngredient', purchasingController.addPurchasedIngredient);


// Manager routes
router.get("/manager/menuItems", managerController.getAllMenuItems);
router.get("/manager/menuItemDetailed/:id", managerController.getMenuItemDetails);
router.get("/managerAddMenuItem", managerController.getAddMenuItem);
router.get("/manager/orderHistory", managerController.getAllOrderHistory);
router.get("/manager/orderDetails/:id", managerController.getOrderDetails);

// Inventory routes
router.get("/inventory/ingredients", inventoryController.getAllIngredients);
router.post('/inventory/addIngredient', inventoryController.addIngredient);
router.get("/inventory/manualCount", inventoryController.getAllPurchasedIngredients);
router.get("/inventory/discrepancyReport", inventoryController.getdiscrepancyReport);




module.exports = router;