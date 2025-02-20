import { ACTION_TYPE } from '../actions';

const initialSortState = {
	sortOrder: 'asc',
};

export const sortReducer = (state = initialSortState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SORT_PRODUCTS:
			return {
				...state,
				sortOrder: action.payload,
			};
		default:
			return state;
	}
};
