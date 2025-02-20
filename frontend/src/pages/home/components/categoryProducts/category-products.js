import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Load } from '../../../../components';

const CategoryProductsContainer = ({ className, isLoading, products }) => {
	const { id } = useParams();

	useEffect(() => {}, [id]);

	return (
		<div className={className}>
			<div className="product-list">
				{isLoading ? (
					<Load />
				) : products.length > 0 ? (
					products.map((product) => (
						<Link to={`/products/${product.id}`} key={product.id}>
							<div className="product-card">
								<section id="card1" className="card">
									<img
										src={product.image}
										alt={product.title}
										height="280px"
										width="280px"
									/>
									<div className="card__content">
										<p className="card__title">{product.title}</p>
										<p className="card__">{product.content}</p>
										<p className="card__description">
											{product.price} ₽
										</p>
									</div>
								</section>
							</div>
						</Link>
					))
				) : (
					<p>Нет товаров в этой категории</p>
				)}
			</div>
		</div>
	);
};

export const CategoryProducts = styled(CategoryProductsContainer)`
	.product-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px;
		max-width: 1300px;
	}
	.product-card {
		margin: 20px;
	}

	section.card {
		width: 280px;
		height: 280px;
		background-color: #474dc3;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}
	.card img {
		fill: #333;
		transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		border-radius: 3px;
	}
	.card:hover {
		transform: scale(1.05);
		box-shadow: 0 8px 16px #000000;
		background-color: #474dc3;
		color: #ffffff;
	}

	.card__content {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: 20px;
		box-sizing: border-box;
		background-color: #474dc3;
		transform: rotateX(-90deg);
		transform-origin: bottom;
		transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}

	* .card:hover .card__content {
		transform: rotateX(0deg);
	}

	.card__title {
		margin: 0;
		padding-left: 5px;
		font-size: 24px;
		color: var(--white);
		font-weight: 700;
	}

	.card:hover img {
		scale: 0;
	}

	.card__description {
		margin: 10px 0 0;
		font-size: 14px;
		color: #ffffff;
		line-height: 1.4;
		float: right;
	}
	.card__ {
		margin: 10px 0 0;
		font-size: 14px;
		color: #ffffff;
		line-height: 1.4;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 9;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
	}
`;
