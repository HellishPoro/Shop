import { useEffect, useMemo, useState } from 'react';
import { CategoriesList, CategoryProducts, ProductCard, Search } from './components';
import { Load } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory, selectIsLoading, selectSort } from '../../selectors';
import { categoryName, hideLoading, showLoading, sortProducts } from '../../actions';
import { debounce } from './utils/debounce';
import styled from 'styled-components';
import { useMatch } from 'react-router-dom';
import { request } from '../../utils/request';

const HomeContainer = ({ className }) => {
	const [product, setProducts] = useState([]);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const isCategories = useMatch('/category/:id');
	const isLoading = useSelector(selectIsLoading);
	const sortOrder = useSelector(selectSort);
	const categoryId = useSelector(selectCategory);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!isCategories) {
			dispatch(categoryName(null));
		}
	}, [isCategories, dispatch]);

	useEffect(() => {
		dispatch(showLoading());
		request(
			`/products?search=${searchPhrase}${categoryId ? `&category=${categoryId}` : ''}&sortOrder=${sortOrder}`,
		)
			.then(({ data: { products } }) => {
				setProducts(products);
			})
			.finally(() => {
				dispatch(hideLoading());
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, shouldSearch, sortOrder, categoryId, sortOrder]);

	const debouncedSearchTrigger = useMemo(
		() =>
			debounce(() => {
				setShouldSearch((prev) => !prev);
			}, 1000),
		[],
	);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		debouncedSearchTrigger();
	};

	const handleSortChange = ({ target }) => {
		dispatch(sortProducts(target.value));
	};

	return (
		<>
			{isLoading ? (
				<Load />
			) : (
				<div>
					{isCategories && product.length !== 0 ? (
						<div>
							<CategoriesList />
							<CategoryProducts products={product} isLoading={isLoading} />
						</div>
					) : (
						<div className={className}>
							<CategoriesList />
							<Search searchPhrase={searchPhrase} onChange={onSearch} />
							<div className="sort">
								<label htmlFor="sortOrder">Сортировать по:</label>
								<select
									id="sortOrder"
									value={sortOrder}
									onChange={handleSortChange}
								>
									<option value="asc">Цене (По возрастранию)</option>
									<option value="desc">Цене (По убыванию)</option>
								</select>
							</div>
							{product.length > 0 ? (
								<div className="product-list">
									{product.map(
										({ id, title, image, price, content }) => (
											<ProductCard
												key={id}
												id={id}
												title={title}
												image={image}
												price={price}
												content={content}
											/>
										),
									)}
								</div>
							) : (
								<div className="no-products-found">Товары не найдены</div>
							)}
						</div>
					)}
				</div>
			)}
		</>
	);
};

export const Home = styled(HomeContainer)`
	.sort {
		display: flex;
		justify-content: center;
		margin: 10px 0 30px 0;
	}

	label {
		margin-right: 10px;
		color: #fff;
	}

	select {
		border: 2px solid #d39125;
	}

	.product-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px;
		max-width: 1300px;
	}
`;
