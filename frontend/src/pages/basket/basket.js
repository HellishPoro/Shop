import styled from 'styled-components';
import { Button } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../../selectors';
import { deleteProductToCart, updateQuantity } from '../../actions';
import { useNavigate } from 'react-router-dom';

const BasketContainer = ({ className }) => {
	const productCart = useSelector(selectCart);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const newArray = Object.values(
		productCart.reduce((acc, obj) => {
			if (!acc[obj.id]) {
				acc[obj.id] = { ...obj, quantity: obj.quantity || 1 };
			} else {
				acc[obj.id].quantity += obj.quantity;
			}
			return acc;
		}, {}),
	);

	const handleUpdateQuantity = (itemId, delta) => {
		dispatch(updateQuantity({ id: itemId, delta }));
	};

	const removeItem = (itemId) => {
		localStorage.getItem('cart');
		dispatch(deleteProductToCart(itemId));
	};

	const totalAmount = newArray.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);

	const handleConfirmOrder = () => {
		const totalItems = newArray.reduce((sum, item) => sum + item.quantity, 0);
		localStorage.setItem('orderSummary', JSON.stringify({ totalItems, totalAmount }));

		navigate('/order-confirmation');
	};

	return (
		<div className={className}>
			<div className="basket-content">
				<div className="left-section">
					<h2>Редактирование заказа</h2>
					<div className="items-list">
						{newArray.map((item) => (
							<div key={item.id} className="basket-item">
								<img
									className="image"
									src={item.image}
									alt={item.title}
								/>
								<div className="item-controls">
									<Button
										className="quantity-btn"
										onClick={() => handleUpdateQuantity(item.id, -1)}
									>
										-
									</Button>
									<span className="item-quantity">{item.quantity}</span>
									<Button
										className="quantity-btn"
										onClick={() => handleUpdateQuantity(item.id, 1)}
									>
										+
									</Button>
								</div>
								<div className="item-info">
									<div className="item-name">{item.title}</div>
									<div className="price-per-unit">
										{item.price * item.quantity}₽ {item.quantity}/шт
									</div>
								</div>
								<Button
									className="remove-btn"
									onClick={() => removeItem(item.id)}
								>
									×
								</Button>
							</div>
						))}
					</div>
				</div>

				<div className="right-section">
					<h2>Ваш заказ</h2>
					<div className="order-summary">
						<div className="items-preview">
							{newArray.map((item) => (
								<div key={item.id} className="preview-item">
									<span className="item-name">{item.title}</span>
									<span className="item-quantity">
										×{item.quantity}
									</span>
								</div>
							))}
						</div>
						<div className="total-section">
							<div className="total-line">
								<span>Общая стоимость:</span>
								<span className="total-amount">{totalAmount}₽</span>
							</div>
						</div>
						<Button
							className="checkout-button"
							onClick={handleConfirmOrder}
							disabled={newArray.length === 0}
						>
							Подтвердить заказ
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export const Basket = styled(BasketContainer)`
	width: 100%;
	min-height: 100vh;
	background: linear-gradient(45deg, #1a1a2e 0%, #16213e 100%);
	display: flex;
	font-family: 'Poppins', sans-serif;
	color: white;

	.image {
		border-radius: 10px;
		height: 100px;
		width: 120px;
	}

	.basket-content {
		width: 100%;
		max-width: 1400px;
		margin: 0 auto;
		padding: 40px;
		display: grid;
		grid-template-columns: 1fr 400px;
		gap: 40px;
		align-items: start;
	}

	.left-section {
		background: rgba(25, 25, 50, 0.8);
		border-radius: 20px;
		padding: 30px;
		backdrop-filter: blur(15px);
		border: 1px solid rgba(108, 92, 231, 0.3);
		box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
	}

	.items-list {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.basket-item {
		display: flex;
		align-items: center;
		gap: 20px;
		padding: 25px;
		background: rgba(40, 36, 76, 0.6);
		border-radius: 15px;
		transition: all 0.3s ease;

		&:hover {
			transform: translateY(-3px);
			box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
		}
	}

	.item-controls {
		display: flex;
		align-items: center;
		gap: 15px;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 12px;
		padding: 10px;
		border: 2px solid #6c5ce7;
	}

	.quantity-btn {
		width: 40px;
		height: 40px;
		border: none;
		border-radius: 10px;
		background: #4a40a3;
		color: white;
		font-size: 20px;
		cursor: pointer;
		transition: all 0.3s;

		&:hover {
			background: #6c5ce7;
			transform: scale(1.1);
		}
	}

	.item-quantity {
		min-width: 30px;
		text-align: center;
		font-weight: 600;
		font-size: 18px;
		color: #fff;
	}

	.item-info {
		flex-grow: 1;

		.item-name {
			font-size: 20px;
			font-weight: 500;
			color: #fff;
			margin-bottom: 8px;
		}

		.price-per-unit {
			color: #a8a5d6;
			font-size: 16px;
		}
	}

	.remove-btn {
		width: 40px;
		height: 40px;
		border: none;
		background: rgba(255, 75, 75, 0.2);
		border-radius: 50%;
		color: #ff4b4b;
		font-size: 24px;
		cursor: pointer;
		transition: all 0.3s;

		&:hover {
			background: rgba(255, 75, 75, 0.3);
			transform: rotate(90deg) scale(1.1);
		}
	}

	.right-section {
		background: rgba(25, 25, 50, 0.8);
		border-radius: 20px;
		padding: 30px;
		backdrop-filter: blur(15px);
		border: 1px solid rgba(108, 92, 231, 0.3);
		box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
		position: sticky;
		top: 40px;
	}

	.order-summary {
		display: flex;
		flex-direction: column;
		gap: 25px;
	}

	.items-preview {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.preview-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px 0;
		border-bottom: 1px solid rgba(108, 92, 231, 0.2);

		.item-name {
			font-size: 16px;
			color: #fff;
		}

		.item-quantity {
			color: #a8a5d6;
			font-size: 17px;
		}
	}

	.total-section {
		padding: 20px 0;
		border-top: 2px solid rgba(108, 92, 231, 0.3);
		margin-top: 20px;
	}

	.total-line {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15px;

		span {
			font-size: 18px;
			color: #fff;
		}

		.total-amount {
			font-size: 28px;
			color: #6c5ce7;
			font-weight: 700;
		}
	}

	.checkout-button {
		width: 100%;
		padding: 18px;
		background: linear-gradient(135deg, #6c5ce7 0%, #4a40a3 100%);
		border: none;
		border-radius: 15px;
		color: white;
		font-size: 18px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s;

		&:hover {
			transform: translateY(-2px);
			box-shadow: 0 10px 30px rgba(108, 92, 231, 0.4);
		}
	}

	.checkout-button:disabled {
		background: gray;
		cursor: not-allowed;
		box-shadow: none;
		transform: none;
	}
`;
