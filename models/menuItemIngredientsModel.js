var mongoose = require('mongoose');

var menuItemIngredientsSchema = new mongoose.Schema({
    ingredient: {
        type: Schema.Types.ObjectId,
        ref: 'ingredientID'
    },
    quantity: {
        type: Array,
        required: true
    },
}, {timestamps: true});

module.exports = mongoose.model('menuItemIngredientsModel', menuItemIngredientsSchema);