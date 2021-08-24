const MenuItemIngredient = require("../models/menuItemIngredientsModel.js");
const Ingredients = require("../models/IngredientModel.js");
const Unit = require("../models/UnitModel.js");
const MenuItem = require("../models/menuItemModel.js");

const managerController = {

	getAllMenuItems: (req, res) => {
		MenuItem.find()
		.exec()
		.then(result => {
			res.render('managerMenu', {menuItem: result});
		})
		.catch(err => {
			console.log(err);
		});
	},


	getMenuItemDetails: (req, res) => {



		MenuItem.findById(req.params.id)
		.exec()
		.then(result => { 
			const menuItem = result;

			MenuItemIngredient.find({menutItem: req.params.id})
			.populate('ingredient', 'ingredientName')
			.populate('uom', 'abbrev')
			.exec()
			.then(result => {
				
				res.render('managerMenuItemDetailed', {
					menuItemIngredient: result,
					menuItem: menuItem
				});
				
			})
			.catch(err => {
				console.log(err);
			});
		})
		.catch(err => {
			console.log(err);
		});

		
	}

};

module.exports = managerController;