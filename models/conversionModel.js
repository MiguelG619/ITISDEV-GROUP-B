
var mongoose = require('mongoose');
 
var conversionSchema = new mongoose.Schema({
    // Primary key PK purchase_ingredient_id in lucidcharts table
    // _id: Schema.Types.ObjectId, 
    fromUnitOfMeasurement: {
        type: String,
        required: true
    },
    toUnitOfMeasurement: {
        type: String,
        required: true
    },
    fromRatio: {
        type: Number,
        required: true
    },
    toRatio: {
        type: Number,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('PurchasedIngredientsSchema', conversionSchema);