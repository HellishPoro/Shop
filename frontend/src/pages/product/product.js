import { useEffect, useLayoutEffect, useState } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ProductContent, ProductEdit } from './components';
import {
	hideLoading,
	loadProductAsync,
	RESET_PRODUCT_DATA,
	showLoading,
} from '../../actions';
import { selectIsLoading, selectProduct } from '../../selectors';
import styled from 'styled-components';
import { Error, Load, PrivateContent } from '../../components';
import { ROLE } from '../../constants';

const ProductContainer = ({ className }) => {
	const [error, setError] = useState(null);
	const product = useSelector(selectProduct);
	const dispatch = useDispatch();
	const isEditing = !!useMatch('/products/:id/edit');
	const isCreating = !!useMatch('/products');
	const params = useParams();
	const isLoading = useSelector(selectIsLoading);

	useLayoutEffect(() => {
		dispatch(RESET_PRODUCT_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		dispatch(showLoading());

		if (isCreating) {
			dispatch(hideLoading(false));
			return;
		}
		if (isEditing) {
			dispatch(hideLoading(false));
			return;
		}
		dispatch(loadProductAsync(params.id)).then((productData) => {
			setError(productData.error);
			dispatch(hideLoading(false));
		});
	}, [dispatch, params.id, isCreating, isEditing]);

	return (
		<>
			{isLoading ? (
				<Load />
			) : (
				<>
					{error ? (
						<Error error={error} />
					) : isCreating || isEditing ? (
						<PrivateContent access={[ROLE.ADMIN]} serverError={error}>
							<div className={className}>
								<ProductEdit
									product={{ ...product, price: Number(product.price) }}
								/>
							</div>
						</PrivateContent>
					) : (
						<div className={className}>
							<ProductContent
								product={{ ...product, price: Number(product.price) }}
							/>
						</div>
					)}
				</>
			)}
		</>
	);
};

export const Product = styled(ProductContainer)`
	padding: 20px 300px;
`;
