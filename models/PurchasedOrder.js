
var mongoose = require('mongoose');
var purchasedOrderSchema = new mongoose.Schema({
    // Primary key PK purchase_ingredient_id in lucidcharts table
    // _id: Schema.Types.ObjectId, 

    // Foreign Key
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });

module.exports = mongoose.model('PurchasedOrder', purchasedOrderSchema);