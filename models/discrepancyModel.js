var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var discrepancySchema = new Schema({
    ingredient: {
        type: Schema.Types.ObjectId,
        ref: 'Ingredients'
    }, 
    reason: {
        type: String,
        required: true
    },
    lossQuantity: {
        type: Number,
        required: true
    },
    uom: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

module.exports = mongoose.model('Discrepancy', discrepancySchema);