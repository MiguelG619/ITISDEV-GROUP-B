const PurchasedIngredients = require("../models/PurchasedIngredientsModel.js");
const Ingredients = require("../models/IngredientsModel.js");
const PurchasedOrder = require("../models/PurchasedOrder.js");
const PurchasedOrderIngredients = require("../models/PurchasedOrderIngredients.js");

const purchasingController = {



  getAllPurchasedIngredients:  (req, res) => {
    PurchasedIngredients.find()
    .populate('ingredient', 'ingredientName')
    .sort({ createdAt: -1 })
    .exec()
    .then(result => {
      res.render('purchasedIngredients', { purchasedIngredients: result });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Error",
      });
    });
  },

  // for purchased
  getPurchasedIngredientsToList:  (req, res) => {
    PurchasedIngredients.find()
    .sort({ createdAt: -1 })
    .exec()
    .then(result => {
      res.render('purchased', { purchasedIngredients: result });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Error",
      });
    });
  },

  getToPurchaseIngredients: (req, res) => {
    Ingredients.find({isLowStock: true})
    .sort({ createdAt: -1})
    .exec()
    .then(result => {
      res.render('purchasingToPurchase', {ingredients: result});
    })
    .catch(err => {
      res.status(404).json({
        message: "Error",
      });
    });
  }, 

  getAllPurchasedOrders:  (req, res) => {
    PurchasedOrder.find()
    .populate('user', 'firstName lastName')
    .sort({ createdAt: -1 })
    .exec()
    .then(result => {
      res.render('purchasedOrdersHome', { purchasedOrder: result });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Error",
      });
    });
  }, 
  
  getPurchasedOrderDetails: (req, res) => {
    const id = req.params.id;
    // console.log(id);
    PurchasedOrderIngredients.find({purchaseOrder: id})
    .populate('purchasedIngredients')
    .exec()
    .then(result => {
      res.render('purchasedOrderDetails', {purchasedIngredients: result.purchasedIngredients});
    })
    .catch(err => {
      res.status(404).json({
        message: "Error"
      });
    });
  },


};

module.exports = purchasingController;