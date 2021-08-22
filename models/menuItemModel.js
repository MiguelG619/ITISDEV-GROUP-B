var mongoose = require('mongoose');

var menuItemIngredientsSchema = new mongoose.Schema({
     /*
    Ito na yung primary key na inaautogenerate ng mongoose so hindi na kailangan ideclare
    _id: Schema.Types.ObjectId, 
    */
    menuItemName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        //required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {timestamps: true});
module.exports = mongoose.model('MenuItem', menuItemSchema);