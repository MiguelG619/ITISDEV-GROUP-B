
var mongoose = require('mongoose');

var orderMenuItemsSchema = new mongoose.Schema({
    menuItem:{
        type: Array,
        required: true
    },
    quantity: {
        type: String,
        required: true
    }
}, {timestamps: true});

    module.exports = mongoose.model('orderMenuItems', orderMenuItemsSchema);