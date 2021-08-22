var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var purchasedIngredientsSchema = new Schema({
    // Primary key PK purchase_ingredient_id in lucidcharts table
    // _id: Schema.Types.ObjectId, 

    // Foreign Key
    ingredient: {
        type: Schema.Types.ObjectId,
        ref: 'Ingredients'
    },
    quantityPerStock: {
        type: Number,
        required: true
    },
    purchasedIngredientName: {
        type: String,
        required: true
    },
    uom: {
        type: String,
        required: true
    },
    quantityPurchased: {
        type: Number,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('PurchasedIngredients', purchasedIngredientsSchema);