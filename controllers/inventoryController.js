const Ingredients = require("../models/IngredientModel.js");
const Unit = require("../models/UnitModel.js");


const managerController = {


	getAllIngredients: (req, res) => {
		Unit.find()
	.exec()
	.then(result => {
		const unit = result;

		Ingredients.find()
		.populate('uom', 'abbrev')
		.exec()
		.then(result => {
			res.render('inventory', {
				ingredients: result,
				uom: unit
			});
		})
		.catch(err => {
			console.log(err);
		});
	})
	.catch(err => {
		console.log(err);
	});
		
	},

	addIngredient: (req, res) => {
		Unit.findOne({abbrev: req.body.uom})
		.exec()
		.then(result => {
			const unit = result;

			const ingredient = new Ingredients({
				ingredientName: req.body.name,
				totalQuantity: 0,
				uom: unit._id,
				reorderPoint: req.body.reorderPoint
			});

			ingredient.save()
			.then(result => {
				console.log(result);
				res.redirect('/inventory/ingredients');
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