const Unit = require("../models/UnitModel.js");

const uomController = {
	getAddUOM: (req, res) => {
		res.render('addUOM');
	},

	addUOM: async (req, res) => {
		const uom = new Unit({
			abbrev: req.body.abbrev,
			fullName: req.body.uom
		});

		try {
			await uom.save();
			res.redirect('/getAddUOM');
		} catch (err) {
			console.log(err);
		}
		
	}

};


module.exports = uomController;