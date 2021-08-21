const express = require("express");
const purchasingController = require("../controllers/purchasingController");
const router = express.Router();

router.get("/purchasedIngredients", purchasingController.getAllPurchasedIngredients);
router.get("/purchased", purchasingController.getPurchasedIngredientsToList);
router.get("/toPurchase", purchasingController.getToPurchaseIngredients);
router.get("/purchasedOrders", purchasingController.getAllPurchasedOrders);
router.get("/purchasedOrderDetails/id", purchasingController.getPurchasedOrderDetails);

