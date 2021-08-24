const PurchasedIngredients = require("../models/PurchasedIngredientModel.js");
const Ingredients = require("../models/IngredientModel.js");
const PurchasedOrder = require("../models/PurchasedOrderModel.js");
const PurchasedOrderIngredients = require("../models/PurchasedOrderIngredientsModel.js");
// MUST IMPORT REFERENCE MODEL WHEN IT IS GOING TO BE USED
const Unit = require("../models/UnitModel.js");

const purchasingController = {

// GET FUNCTIONS
getAllPurchasedIngredients:  (req, res) => {

    /* 
      find in mongoose that is used in sir Arren's db.js 
       ^ https://www.youtube.com/watch?v=bxsemcrY4gQ&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=9
       *** USE .exec() to make sure that  mongodb finishes finding first before going to the next step
      Populate
      https://stackoverflow.com/questions/38051977/what-does-populate-in-mongoose-mean
      https://www.youtube.com/watch?v=3p0wmR973Fw
      */

    //you can populate two times if needed
    // for the ingredients, you only need to populate the uom as seen in getToPurchasedIngredients below

    PurchasedIngredients.find()
    .populate('ingredient', 'ingredientName')
    .populate('uom', 'abbrev')
    .sort({ createdAt: -1 })
    .exec()
    .then(result => {
       /* purchasedIngredients is just a name, can be anything
        ^ this is used in the hbs file, usually placed inside the #each
        result is the Ingredient schema where the uom is loaded and available for use in the hbs
        */ 
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
        .populate('uom')
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
    // checks if totalquantity in ingredients/ system count is less than or equal to reorderpoint
    Ingredients.find( { $expr: { $lte: [ "$totalQuantity" , "$reorderPoint" ] } } )
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
    /* https://stackoverflow.com/questions/19222520/populate-nested-array-in-mongoose --- paths
       populate the ref inside a ref
       ex. purchasedOrderIngredients has purchasedIngredients ref
       so first populate the purchasedIngredients
       then populate the uom so it can be used in the hbs
       */
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





  // POST FUNCTIONS

  addPurchasedIngredient: (req, res) => {
    const userSystemIngredient = req.body.systemIngredient;
    const userUom = req.body.uom;

    Unit.findOne({abbrev: userUom})
    .exec()
    .then(result => {
      const uom = result;

      Ingredients.findOne({ingredientName: userSystemIngredient})
      .exec()
      .then(result => {
        const systemIngredient = result;

        const purchasedIngredient = new PurchasedIngredients({
          ingredient: systemIngredient._id,
          quantityPerStock: req.body.quantityPerStock,
          purchasedIngredientName: req.body.name,
          uom: uom._id,
          quantityPurchased: 0
        });
       
        purchasedIngredient.save()
        .then(result => {
          res.redirect('/purchasing/purchased');

        })
        .catch(err => {
          console.log(err);
        });
        
      })
      .catch(err => {
        console.log(err);
      });

    })
    .catch(err => {
      console.log(err);
    });
    

  
  }


};

module.exports = purchasingController;