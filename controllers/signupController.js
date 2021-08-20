const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const signupController = {

    getSignUp: function (req, res) {
        res.render('signup');
    },

    postSignUp: function (req, res) {
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
        
    },

    getCheckEmail: function (req, res) {

        var email = req.query.email;

        db.findOne(User, {email: email}, 'email', function (result) {
            res.send(result);
        });
    }
}

module.exports = signupController;
