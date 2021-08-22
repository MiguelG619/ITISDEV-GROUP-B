
var mongoose = require('mongoose');

var unitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
}, {timestamps: true});

module.exports = mongoose.model('Unit', unitSchema);