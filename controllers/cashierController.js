const MenuItemIngredient = require("../models/menuItemIngredientsModel.js");
const Ingredients = require("../models/IngredientModel.js");
const Unit = require("../models/UnitModel.js");
const MenuItem = require("../models/menuItemModel.js");

const cashierController = {

	getAllMenuItems: (req, res) => {
		MenuItem.find()
		.exec()
		.then(result => {
			res.render('cashierOrders', {menuItem: result});
		})
		.catch(err => {
			console.log(err);
		});
	}

	};

module.exports = cashierController;