
const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const loginController = {

    getLogIn: function (req, res) {
        res.render('login');
    },

    postLogIn: function (req, res) {

    }
}

module.exports = loginController;