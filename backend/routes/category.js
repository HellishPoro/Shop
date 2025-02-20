const express = require('express');
const {
	getCategory,
	getCategories,
	addCategories,
} = require('../controllers/categories');
const hasRole = require('../middlewares/hasRole');
const ROLES = require('../constants/roles');
const authenticated = require('../middlewares/authenticated');

const router = express.Router({ mergeParams: true });

router.get('/:label', async (req, res) => {
	const category = await getCategory(req.params.label);

	res.send({ data: category });
});

router.get('/', async (req, res) => {
	try {
		const categories = await getCategories();

		if (!Array.isArray(categories)) {
			throw new Error('Invalid categories format');
		}

		res.send({ data: categories });
	} catch (error) {
		res.status(500).send({
			error: error.message || 'Ошибка получения категорий',
		});
	}
});

router.post('/add', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const newCategories = await addCategories({
		label: req.body.label,
		name: req.body.name,
	});

	res.send({ data: newCategories });
});

module.exports = router;
