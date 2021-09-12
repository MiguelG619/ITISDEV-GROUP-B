const Ingredients = require("../models/IngredientModel.js");
const Unit = require("../models/UnitModel.js");
const PurchasedIngredients = require("../models/PurchasedIngredientModel.js");
const Discrepancy = require("../models/DiscrepancyModel.js");

function ManualCountInstance (purchasedIngredient, manualCount, lossQuantity) {
    this.purchasedIngredient = purchasedIngredient;
    this.manualCount = manualCount;
    this.lossQuantity = lossQuantity;
};

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

    postManualCount: async (req, res) => {
        try {
            // const inputs = req.body;

            const purchasedIngredientsId = req.body.purchasedIngredientId;
            const manualCountInput = req.body.manualCount;
            var details = [];

            console.log('inputs: ' + manualCountInput.length);

            // const purchasedIngredients = await PurchasedIngredients.find({})
            //     .populate({
            //         path: 'ingredient',
            //         populate: {
            //             path: 'uom',
            //             model: 'Unit'
            //         }
            //     })
            //     .populate('uom')
            //     .exec();

            const ingredients = await Ingredients.find({}).exec();
        
            for(let i = 0; i < manualCountInput.length; i++) {
                const purchasedIngredient = await PurchasedIngredients.find({_id: purchasedIngredientsId[i]})
                .populate({
                    path: 'ingredient',
                    populate: {
                        path: 'uom',
                        model: 'Unit'
                    }
                })
                .populate('uom')
                .exec()
                .then((result) => {
                    result.manualCountInput = manualCountInput[i];

                    console.log('h' + result.manualCountInput + result[0].quantityPerStock);

                    result.lossQuantity = manualCountInput[i] * result[0].quantityPerStock;

                    details.push(result);

                    for(let j = 0; j < details.length; j++) {
                        if(result[0].ingredient == details[j][0].ingredient) {
                            console.log('1- ' + details[j][0].ingredient);
                            console.log('2- ' + result[0].ingredient);
                        }
                        else {
                            console.log('unsame');
                        }
                    }
                })



                // var lossQuantity = purchasedIngredient.ingredient.totalQuantity - manualCountInput

                // var manualCountInstance = new ManualCountInstance(
                //     purchasedIngredient,
                //     manualCountInput[i],
                //     0
                // )

                // var manualCountInstance = {
                //     ingredient: ingredient,
                //     convertedManualInput: manualCountInput[i],
                //     lossQuantity: 0
                // }

                // details.push(purchasedIngredient);
            }

            console.log(details);

            res.render('inventoryDiscrepancyReason', {purchasedIngredients: details});

        } catch (err) {
            console.log(err);
        }
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