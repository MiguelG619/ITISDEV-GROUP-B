const bcrypt = require('bcrypt');

const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const loginController = {

    getLogIn: function (req, res) {
        res.render('login');
    },

    postLogIn: function (req, res) {

        var email = req.body.email;
        var password = req.body.password;

        db.findOne(User, {email: email}, '', function(result) {
            if(result) {
                var user = {
                    firstName: result.firstName,
                    lastName: result.lastName,
                    email: result.email,
                    role: result.role
                }

                bcrypt.compare(password, result.password, function(err, equal){
                    if(equal) {
                        req.session.email = user.email;
                        req.session.firstName = user.firstName;
                        req.session.lastName = user.lastName;
                        req.session.role = user.role;
                        res.redirect('/home/' + req.session.email); 
                    }
                    else {
                        var details = {error: 'Incorrect Email or Password.'};
                        res.render('login', details);
                    }
                });
            }
            else {
                var details = {error: 'Incorrect Email or Password.'};
                res.render('login', details);
            }
        });
    }
}

module.exports = loginController;