import { ACTION_TYPE } from '../actions';

const initialIsLoadingState = {
	isLoading: false,
};

export const isLoadingReducer = (state = initialIsLoadingState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SHOW_LOADING:
			return {
				...state,
				isLoading: true,
			};

		case ACTION_TYPE.HIDE_LOADING:
			return {
				...state,
				isLoading: false,
			};

		default:
			return state;
	}
};
