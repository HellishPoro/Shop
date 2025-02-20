const mongoose = require('mongoose');

const CategoriesSchema = mongoose.Schema({
	label: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
		unique: true,
	},
});

const Categories = mongoose.model('Categories', CategoriesSchema);

module.exports = Categories;
