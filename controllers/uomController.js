const Unit = require("../models/UnitModel.js");

const uomController = {

	addUOM: async (req, res) => {
		const uom = new Unit({
			abbrev: req.body.abbrev,
			fullName: req.body.uom
		});

		try {
			await uom.save();
			res.redirect('back');
		} catch (err) {
			console.log(err);
		}
		
	},
	getAddUOMManager: (req, res) => {
		res.render('addUOMManager');
	},
	getAddUOMPurchasing: (req, res) => {
		res.render('addUOMPurchasing');
	},
	getAddUOMInventory: (req, res) => {
		res.render('addUOMInventory');
	},

};


module.exports = uomController;