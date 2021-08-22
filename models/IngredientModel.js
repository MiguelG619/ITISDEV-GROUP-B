var mongoose = require('mongoose');
 
var ingredientSchema = new mongoose.Schema({
   
    /*
    Ito na yung primary key na inaautogenerate ng mongoose so hindi na kailangan ideclare
    _id: Schema.Types.ObjectId, 
    */
    ingredientName: {
        type: String,
        required: true
    },
    quantityPerStock: {
        type: Number,
        required: true,
        default: 0
    },
    uom: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Unit',
        required: true
    },
    reorderPoint: {
        type: Number,
        required: true
    },
    // ito magseset kung low on stock para mahanap ng controlelr sa to purchase at maload doon
    isLowStock: Boolean
    
}, {timestamps: true});

module.exports = mongoose.model('Ingredient', ingredientSchema);