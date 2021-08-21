var mongoose = require('mongoose');

var menuItemIngredientsSchema = new mongoose.Schema({
    menuItem: {
        type: Schema.Types.ObjectId,
        ref: 'menuItem'
    },
    menuItemName: {
        type: Array,
        required: true
    },
    price: {
        type: Double,
        required: true
    }
}, {timestamps: true});
module.exports = mongoose.model('menuItemModel', menuItemSchema);