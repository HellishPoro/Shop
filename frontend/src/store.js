import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import {
	userReducer,
	usersReducer,
	productReducer,
	productsReducer,
	appReducer,
	isLoadingReducer,
	sortReducer,
	categoriesReducer,
	cartReducer,
} from './reducers';

const reducer = combineReducers({
	user: userReducer,
	users: usersReducer,
	product: productReducer,
	products: productsReducer,
	app: appReducer,
	loading: isLoadingReducer,
	sort: sortReducer,
	category: categoriesReducer,
	cart: cartReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
