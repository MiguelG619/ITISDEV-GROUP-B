const Ingredients = require("../models/IngredientModel.js");
const Unit = require("../models/UnitModel.js");
const PurchasedIngredients = require("../models/PurchasedIngredientModel.js");
const Discrepancy = require("../models/DiscrepancyModel.js");

const inventoryController = {


    getAllIngredients: (req, res) => {
        Unit.find()
            .exec()
            .then(result => {
                const unit = result;

                Ingredients.find()
                    .sort({ totalQuantity: 1 })
                    .populate('uom', 'abbrev')
                    .exec()
                    .then(result => {
                        res.render('inventory', {
                            ingredients: result,
                            uom: unit
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });

    },

    addIngredient: (req, res) => {
        Unit.findOne({ abbrev: req.body.uom })
            .exec()
            .then(result => {
                const unit = result;

                const ingredient = new Ingredients({
                    ingredientName: req.body.name,
                    totalQuantity: 0,
                    uom: unit._id,
                    reorderPoint: req.body.reorderPoint
                });

                ingredient.save()
                    .then(result => {
                        console.log(result);
                        res.redirect('/inventory/ingredients');
                    })
                    .catch(err => {
                        console.log(err);
                    });

            })
            .catch(err => {
                console.log(err);
            });
    },

    getAllPurchasedIngredients: (req, res) => {
        PurchasedIngredients.find()
            .populate('uom', 'abbrev')
            .exec()
            .then(result => {
                res.render('inventoryManualCount', { purchasedIngredients: result });
            })
            .catch(err => {
                console.log(err);
            });

    },

    getdiscrepancyReport: (req, res) => {
        Discrepancy.find()
            .populate({
                path: 'ingredient',
                populate: {
                    path: 'uom',
                    model: 'Unit'
                }
            })
            .exec()
            .then(result => {
                //res.send(result);
                res.render('inventoryDiscrepancyReport', { discrepancyReport: result });
            })
            .catch(err => {
                console.log(err);
            });
    }






};

module.exports = inventoryController;