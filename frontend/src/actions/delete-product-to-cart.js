import { ACTION_TYPE } from './action-type';

export const deleteProductToCart = (productId) => ({
	type: ACTION_TYPE.DELETE_PRODUCT_TO_CART,
	payload: productId,
});
