
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var conversionSchema = new mongoose.Schema({
    fromUnitOfMeasurement: {
        type: Schema.Types.ObjectId, 
        ref: 'Unit',
        required: true
    },
    toUnitOfMeasurement: {
        type: Schema.Types.ObjectId, 
        ref: 'Unit',
        required: true
    },
    fromRatio: {
        type: Number,
        required: true
    },
    toRatio: {
        type: Number,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Conversion', conversionSchema);