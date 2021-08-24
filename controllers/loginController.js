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

                console.log(user);

                bcrypt.compare(password, result.password, function(err, equal){
                    if(equal) {
                        req.session.email = user.email;
                        req.session.firstName = user.firstName;
                        req.session.lastName = user.lastName;
                        req.session.role = user.role;

                        console.log(user.email);

                        if(user.role == 'purchasing')
                        res.redirect('/purchasing/toPurchase');
                           //res.send('Purchasing Page Not Currently working');
                            // res.redirect('/purchasing/purchasedOrders');
                            //res.render('purchasedOrdersHome', details);
                            
                        else if(user.role == 'cashier') 
                            res.render('cashierOrders');    // Not final, to be replaced
                        else if(user.role == 'sales manager')
                            res.render('managerMenu');      // Not final, to be replaced
                        else if(user.role == 'inventory')
                            res.render('inventory');        // Not final, to be replaced
                        else
                            res.send('Error page');
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