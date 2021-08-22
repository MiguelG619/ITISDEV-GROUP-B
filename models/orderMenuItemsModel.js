var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderMenuItemsSchema = new Schema({
    menuItem: {
        type: Schema.Types.ObjectId,
        ref: 'MenuItem'
    },
    quantity: {
        type: Number,
        required: true
    }
}, {timestamps: true});

    module.exports = mongoose.model('OrderMenuItems', orderMenuItemsSchema);