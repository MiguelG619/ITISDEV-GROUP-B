const PurchasedIngredients = require("../models/PurchasedIngredientModel.js");
const Ingredients = require("../models/IngredientModel.js");
const PurchasedOrder = require("../models/PurchasedOrderModel.js");
const PurchasedOrderIngredients = require("../models/PurchasedOrderIngredientsModel.js");
// MUST IMPORT REFERENCE MODEL WHEN IT IS GOING TO BE USED
const Unit = require("../models/UnitModel.js");

const purchasingController = {


  getAllPurchasedIngredients:  (req, res) => {
    PurchasedIngredients.find()
    .populate('ingredient', 'ingredientName')
    .populate('uom', 'abbrev')
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

    Ingredients.find()
    .exec()
    .then(result => {
      const systemIngredients = result;

      Unit.find()
      .exec()
      .then(result => {

        const unit = result;

        PurchasedIngredients.find()
        .sort({ createdAt: -1 })
        .exec()
        .then(result => {
          res.render('purchased', { 
            purchasedIngredients: result, 
            ingredients: systemIngredients,
            unitOfMeasurement: unit 
          });
        })
        .catch((err) => {
          res.status(404).json({
            message: "Error",
          });
        });

      })
      .catch(err => {
        console.log(err);
      })

    })
    .catch(err => {
      console.log(err);
    })

    
  },

  getToPurchasedIngredients: (req, res) => {
    Ingredients.find({isLowStock: true})
    .populate('uom', 'abbrev')
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
    .populate('user')
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
    PurchasedOrderIngredients.find({purchasedOrder: id})
    .populate({
        path: 'purchasedIngredients',
      populate: {
        path: 'uom',
        model: 'Unit'
      }
    })
    .exec()
    .then(result => {
      res.render('purchasedOrderDetails', {purchasedOrderDetails: result});
    })
    .catch(err => {
      res.status(404).json({
        message: "Error"
      });
    });
  },


};

module.exports = purchasingController;