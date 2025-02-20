import { ACTION_TYPE } from '../actions';

const initialProductState = {
	id: '',
	categoryName: '',
	title: '',
	image: '',
	content: '',
	price: '',
	design: '',
	comfort: '',
	materials: '',
	functionality: '',
};

export const productReducer = (state = initialProductState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PRODUCT_DATA:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.RESET_PRODUCT_DATA:
			return initialProductState;
		default:
			return state;
	}
};
