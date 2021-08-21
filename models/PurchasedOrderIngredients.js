
var mongoose = require('mongoose');
var purchasedOrderIngredientsSchema = new mongoose.Schema({
   
    /*
    Ito na yung primary key na inaautogenerate ng mongoose so hindi na kailangan ideclare
    _id: Schema.Types.ObjectId, 
    */

    //ito yung foreign key na isa
    purchaseOrder: {
        type: Schema.Types.ObjectId,
        ref: 'PurchasedOrder'
    },
    // yung isang foreign key
    purchasedIngredients: [{
        type: Schema.Types.ObjectId,
        ref: 'PurchasedIngredients'
    }],
    /*
    quantityPurchased: {
        type: Number,
        required: true
    }
    */
    
}, { timestamps: true });

module.exports = mongoose.model('purchasedOrderIngredients', purchasedOrderIngredientsSchema);