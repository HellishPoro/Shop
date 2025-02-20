import PropTypes from 'prop-types';
import { ROLE } from './role';

const ROLE_ID = PropTypes.oneOf(Object.values(ROLE));

export const PROP_TYPE = {
	ROLE_ID,
	ROLE: PropTypes.shape({
		id: ROLE_ID,
		name: PropTypes.string.isRequired,
	}),
	ERROR: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(null)]),
	PRODUCT: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		design: PropTypes.string.isRequired,
		comfort: PropTypes.string.isRequired,
		materials: PropTypes.string.isRequired,
		functionality: PropTypes.string.isRequired,
		categoryId: PropTypes.string,
	}),
};
