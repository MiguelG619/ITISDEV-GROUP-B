
var mongoose = require('mongoose');
 
var discrepancySchema = new mongoose.Schema({
    discrepancy: {
        type: Schema.Types.ObjectId,
        ref: 'Discrepancy'
    }, 
    ingredient: {
        type: Schema.Types.ObjectId,
        ref: 'Ingredients'
    }, 
    ingredientName: {
        type: String,
        required: true
    },
    quantityPerStock: {
        type: String,
        required: true
    },
    uom: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Discrepancy', discrepancySchema);