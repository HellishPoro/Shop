const Categories = require('../models/Categories');

function addCategories(categories) {
	return Categories.create(categories);
}

async function getCategory(label) {
	const category = Categories.findOne({ label: label });

	if (!category) {
		throw new Error('Category not found');
	}

	return category;
}

async function getCategories() {
	return await Categories.find();
}

module.exports = {
	addCategories,
	getCategory,
	getCategories,
};
