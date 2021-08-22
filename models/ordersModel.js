var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var ordersSchema = new Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'OrderMenuItems'
    },
   totalAmount: {
        type: Number,
        required: true
   },
   date: {
        type: Date,
        default: Date.now
   }
}, {timestamps: true});

module.exports = mongoose.model('Orders', ordersSchema);