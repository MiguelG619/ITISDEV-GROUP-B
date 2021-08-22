var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menuItemIngredientsSchema = new Schema({
    ingredient: {
        type: Schema.Types.ObjectId,
        ref: 'Ingredients'
    },
    menutItem: {
        type: Schema.Types.ObjectId,
        ref: 'MenuItem'
    },
    quantity: {
        type: Number,
        required: true
    },
    uom: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('MenuItemIngredients', menuItemIngredientsSchema);