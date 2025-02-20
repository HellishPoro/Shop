import { ACTION_TYPE } from './action-type';

export const updateProductToCart = (cart) => ({
	type: ACTION_TYPE.UPDATE_PRODUCT_TO_CART,
	payload: cart,
});
