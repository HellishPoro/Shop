import { ACTION_TYPE } from '../actions';

const initialCategoriesState = {
	categories: [],
	selectedCategory: null,
};

export const categoriesReducer = (state = initialCategoriesState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_CATEGORIES:
			return {
				...state,
				categories: action.payload,
			};
		case ACTION_TYPE.SELECT_CATEGORY:
			return {
				...state,
				selectedCategory: action.payload,
			};
		default:
			return state;
	}
};
