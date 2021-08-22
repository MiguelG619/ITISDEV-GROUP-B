var mongoose = require('mongoose');
 
var ingredientsSchema = new mongoose.Schema({
   
    /*
    Ito na yung primary key na inaautogenerate ng mongoose so hindi na kailangan ideclare
    _id: Schema.Types.ObjectId, 
    */
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
    },
    // ito magseset kung low on stock para mahanap ng controlelr sa to purchase at maload doon
    isLowStock: Boolean
    
}, {timestamps: true});

module.exports = mongoose.model('Ingredients', ingredientsSchema);