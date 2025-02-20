import { ACTION_TYPE } from './action-type';

export const setProductToCart = (cart) => ({
	type: ACTION_TYPE.SET_PRODUCT_TO_CART,
	payload: cart,
});
