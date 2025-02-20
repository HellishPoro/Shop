const express = require('express');
const hasRole = require('../middlewares/hasRole');
const ROLES = require('../constants/roles');
const {
	editProduct,
	deleteProduct,
	addProduct,
	getProduct,
	getProducts,
} = require('../controllers/product');
const authenticated = require('../middlewares/authenticated');
const mapProduct = require('../helpers/mapProduct');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
	const { products } = await getProducts(
		req.query.search,
		req.query.category,
		req.query.sortOrder,
	);

	res.send({ data: { products: products.map(mapProduct) } });
});

router.get('/:id', async (req, res) => {
	const product = await getProduct(req.params.id);

	res.send({ data: product });
});

router.post('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	try {
		const newProduct = await addProduct({
			image: req.body.image,
			content: req.body.content,
			price: req.body.price,
			title: req.body.title,
			design: req.body.design,
			comfort: req.body.comfort,
			materials: req.body.materials,
			functionality: req.body.functionality,
			categoryName: req.body.categoryName,
		});

		res.send({ data: mapProduct(newProduct) });
	} catch (error) {
		console.error('Ошибка при добавлении продукта:', error);
		res.status(500).send({ error: error.message || 'Ошибка сервера' });
	}
});

router.patch('/:id/edit', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	console.log(req.params.id);
	const updateProduct = await editProduct(req.params.id, {
		image: req.body.image,
		content: req.body.content,
		price: req.body.price,
		title: req.body.title,
		design: req.body.design,
		comfort: req.body.comfort,
		materials: req.body.materials,
		functionality: req.body.functionality,
		categoryName: req.body.categoryName,
	});

	res.send({ data: mapProduct(updateProduct) });
});

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	await deleteProduct(req.params.id);

	res.send({ error: null });
});

module.exports = router;
