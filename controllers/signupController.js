const { validationResult } = require('express-validator');
const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const signupController = {

    getSignUp: function (req, res) {
        res.render('signup');
    },
}

/*
    exports the object `signupController` (defined above)
    when another script exports from this file
*/
module.exports = signupController;
