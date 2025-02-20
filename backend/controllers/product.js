const Product = require('../models/Product');

async function addProduct(product) {
	const category = product.categoryName;

	if (!category || !category.name) {
		throw new Error('categoryName.name is required');
	}

	const newProduct = await Product.create({
		image: product.image,
		content: product.content,
		price: product.price,
		title: product.title,
		design: product.design,
		comfort: product.comfort,
		materials: product.materials,
		functionality: product.functionality,
		categoryName: {
			label: category.label,
			name: category.name,
		},
	});

	return newProduct;
}

async function editProduct(id, product) {
	const newProduct = await Product.findByIdAndUpdate(id, product, {
		returnDocument: 'after',
	});

	return newProduct;
}

function deleteProduct(id) {
	return Product.deleteOne({ _id: id });
}

async function getProducts(search = '', category = '', sortOrder = 'desc') {
	const query = {};
	const sortOptions = { price: sortOrder === 'asc' ? 1 : -1 };

	if (search) query.title = { $regex: search, $options: 'i' };
	if (category) query['categoryName.label'] = category;

	const products = await Product.find(query).sort(sortOptions);
	return { products };
}

function getProduct(id) {
	return Product.findById(id);
}

module.exports = {
	addProduct,
	editProduct,
	deleteProduct,
	getProduct,
	getProducts,
};
