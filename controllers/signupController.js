const { validationResult } = require('express-validator');
const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const signupController = {

    getSignUp: function (req, res) {
        res.render('signup');
    },

    postSignUp: function (req, res) {
        var errors = validationResult(req);

        if (!errors.isEmpty()) {
        errors = errors.errors;

        var details = {};
        for(i = 0; i < errors.length; i++)
            details[errors[i].param + 'Error'] = errors[i].msg;

        res.render('signup', details);
        }

        else {
            firstName = req.body.firstName;
            lastName = req.body.lastName;
            email = req.body.email;
            password = req.body.password;
            role = req.body.role;

            var user = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                role: role
            }

            db.insertOne(User, user, function(flag) {
                if(flag) {
                    res.send('firstName: ' + firstName +'lastName: ' + lastName + 'email: ' + email);
                }
            });
        }
    }
}

module.exports = signupController;
