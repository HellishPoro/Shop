import { ACTION_TYPE } from './action-type';

export const updateQuantity = (payload) => ({
	type: ACTION_TYPE.UPDATE_QUANTITY,
	payload,
});
