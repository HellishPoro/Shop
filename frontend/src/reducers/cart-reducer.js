import { ACTION_TYPE } from '../actions';

const initialCartState = {
	cart: [],
};

export const cartReducer = (state = initialCartState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PRODUCT_TO_CART:
			return {
				...state,
				cart: action.payload.map((product) => ({
					...product,
					quantity: product.quantity || 1,
				})),
			};
		case ACTION_TYPE.UPDATE_PRODUCT_TO_CART:
			return {
				...state,
				cart: [
					...state.cart,
					{
						...action.payload,
						quantity: action.payload.quantity || 1,
					},
				],
			};
		case ACTION_TYPE.DELETE_PRODUCT_TO_CART:
			return {
				...state,
				cart: state.cart.filter((product) => product.id !== action.payload),
			};
		case ACTION_TYPE.UPDATE_QUANTITY:
			return {
				...state,
				cart: state.cart.map((item) => {
					if (item.id === action.payload.id) {
						const newQuantity = item.quantity + action.payload.delta;
						return {
							...item,
							quantity: newQuantity > 0 ? newQuantity : 1,
						};
					}
					return item;
				}),
			};
		case ACTION_TYPE.CLEAR_CART:
			return {
				...state,
				cart: [],
			};
		case ACTION_TYPE.RESET_PRODUCT_TO_CART:
			return initialCartState;
		default:
			return state;
	}
};
