import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ProductCardContainer = ({ className, id, title, image, price, content }) => {
	return (
		<div className={className}>
			<Link className="link" to={`/products/${id}`}>
				<section id="card1" className="card">
					<img src={image} alt={title} height="280px" width="280px" />
					<div className="card__content">
						<p className="card__title">{title}</p>
						<p className="card__">{content}</p>
						<p className="card__description">{price} ₽</p>
					</div>
				</section>
			</Link>
		</div>
	);
};

export const ProductCard = styled(ProductCardContainer)`
	width: 280px;
	display: flex;
	flex-direction: column;
	margin: 20px;

	section.card {
		width: 280px;
		height: 280px;
		background: linear-gradient(45deg, #1a1a2e 0%, #16213e 100%);
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
		background: linear-gradient(45deg, #1a1a2e 0%, #16213e 100%);
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
		background: linear-gradient(45deg, #1a1a2e 0%, #16213e 100%);
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

ProductCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	content: PropTypes.string.isRequired,
};
