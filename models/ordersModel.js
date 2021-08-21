
var mongoose = require('mongoose');
 
var ordersSchema = new mongoose.Schema({
    order: {
        type: Schema.Types.ObjectId,
        ref: 'orders'
    }, 
    employeeID: {
        type: String,
        required: true
    },
   totalAmount: {
        type: String,
        required: true
   },
}, {timestamps: true});

module.exports = mongoose.model('orders', ordersSchema);