import { ACTION_TYPE } from './action-type';

export const sortProducts = (order) => ({
	type: ACTION_TYPE.SORT_PRODUCTS,
	payload: order,
});
