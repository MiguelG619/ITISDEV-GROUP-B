const User = require('../models/UserModel.js');

const bossController = {

    getAllUsers: function (req, res) {
        User.find({})
            .exec()
			.then((result) => {
				res.render("bossAssignUsers", { Users: result });
			})
			.catch((err) => {
				console.log(err);
			});;
    },

    getAssignRole: function (req, res) {

    }
}

module.exports = bossController;