
var mongoose = require('mongoose');
 
var purchasedIngredientsSchema = new mongoose.Schema({
    // Primary key PK purchase_ingredient_id in lucidcharts table
    // _id: Schema.Types.ObjectId, 
    ingredient: {
        type: Schema.Types.ObjectId,
        ref: 'Ingredients'
    },
    quantityPerStock: {
        type: String,
        required: true
    },
    purchasedIngredientName: {
        type: String,
        required: true
    },
    uom: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('PurchasedIngredientsSchema', userSchema);