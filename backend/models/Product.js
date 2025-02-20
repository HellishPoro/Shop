const mongoose = require('mongoose');
const validator = require('validator');

const ProductSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
		validate: {
			validator: validator.isURL,
			message: 'Image should be a valid url',
		},
	},
	content: {
		type: String,
		required: true,
	},
	design: {
		type: String,
		required: true,
	},
	comfort: {
		type: String,
		required: true,
	},
	materials: {
		type: String,
		required: true,
	},
	functionality: {
		type: String,
		required: true,
	},
	categoryName: {
		label: { type: String, required: true },
		name: { type: String, required: true },
	},
	price: {
		type: Number,
		required: true,
		min: 0,
	},
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
