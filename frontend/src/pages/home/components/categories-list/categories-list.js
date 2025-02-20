import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectCategories } from '../../../../selectors';
import { categoryName, setCategories } from '../../../../actions';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { request } from '../../../../utils/request';

export const CategoriesListContainer = ({ className }) => {
	const dispatch = useDispatch();
	const categories = useSelector(selectCategories);

	useEffect(() => {
		request('/categories', 'GET').then(({ data }) => dispatch(setCategories(data)));
	}, [dispatch]);

	return (
		<div className={className}>
			<div className="box">
				{categories.map((category) => (
					<div className="category" key={category._id}>
						<Link
							to={`/category/${category.label}`}
							onClick={() => dispatch(categoryName(category.label))}
						>
							{category.name}
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export const CategoriesList = styled(CategoriesListContainer)`
	display: flex;
	justify-content: center;

	a {
		color: #fff;
		text-decoration: none;
	}

	a:focus,
	a:hover {
		color: #d39125;
	}

	.box {
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2px solid #d39125;
		border-bottom-left-radius: 15px;
		border-bottom-right-radius: 15px;
		padding-bottom: 5px;
	}

	.category {
		margin: 0 50px 0 50px;
	}
`;
