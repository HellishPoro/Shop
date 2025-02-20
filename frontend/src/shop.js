import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Error, Footer, Header, Modal } from './components';
import {
	Authorization,
	Basket,
	Home,
	Product,
	Registration,
	TneCompany,
	Users,
} from './pages';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProductToCart, setUser } from './actions';
import { selectCart, selectUserLogin } from './selectors';
import { OrderConfirmation } from './pages/basket';
import { ERROR } from './constants';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100%;
	margin: 0 auto;
	position: relative;
`;

const Page = styled.div`
	min-height: 516px;
	padding: 150px 0 130px;
	display: flex;
	justify-content: center;
	background: linear-gradient(45deg, #1a1a2e 0%, #16213e 100%);
`;

export const Shop = () => {
	const dispatch = useDispatch();
	const productCart = useSelector(selectCart);
	const userId = useSelector(selectUserLogin);

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			dispatch(setUser(null));
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(
			setUser({
				id: currentUserData.id,
				login: currentUserData.login,
				roleId: Number(currentUserData.roleId),
			}),
		);
	}, [dispatch]);

	useLayoutEffect(() => {
		if (userId === undefined) return;

		const cartKey = userId ? `cart_${userId}` : 'cart_guest';
		const cart = localStorage.getItem(cartKey);

		if (cart) {
			try {
				const cartData = JSON.parse(cart);
				dispatch(setProductToCart(cartData));
			} catch (error) {
				console.error('Ошибка загрузки корзины:', error);
				localStorage.removeItem(cartKey);
				dispatch(setProductToCart([]));
			}
		} else {
			dispatch(setProductToCart([]));
		}
	}, [dispatch, userId]);

	useLayoutEffect(() => {
		if (userId === undefined) return;

		const cartKey = userId ? `cart_${userId}` : 'cart_guest';
		localStorage.setItem(cartKey, JSON.stringify(productCart));
	}, [productCart, userId]);

	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/products" element={<Product />} />
					<Route path="/products/:id" element={<Product />} />
					<Route path="/products/:id/edit" element={<Product />} />
					<Route path="/basket-of-goods" element={<Basket />} />
					<Route path="/order-confirmation" element={<OrderConfirmation />} />
					<Route path="/brand" element={<TneCompany />} />
					<Route path="/category/:id" element={<Home />} />
					<Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppColumn>
	);
};
