const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const homeController = {

    getHome: function(req, res) {
        var email = req.param.email;

        db.findOne(User, {email: email}, '', function(result) {
            if(result) {
                var user = {
                    firstName: result.firstName,
                    lastName: result.lastName,
                    email: result.email,
                    role: result.role
                }

                if (user.role == "purchasing") {
                    res.redirect('/purchasedOrders');
                }
                else {
                    res.send("Error Page");
                }

                // bcrypt.compare(password, result.password, function(err, equal){
                //     if(equal) {
                //         req.session.email = user.email;
                //         req.session.firstName = user.firstName;
                //         req.session.lastName = user.lastName;
                //         req.session.role = user.role;
                //         res.redirect('/home/' + req.session.email);
                //     }
                //     else {
                //         var details = {error: 'Incorrect Email or Password.'};
                //         res.render('login', details);
                //     }
                // });
            }
            else {
                var details = {error: 'Incorrect Email or Password.'};
                res.render('login', details);
            }
        });
    }

}

module.exports = homeController;