
var mongoose = require('mongoose');
 
var ingredientsSchema = new mongoose.Schema({
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
    reorderPoint: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Ingredients', ingredientsSchema);