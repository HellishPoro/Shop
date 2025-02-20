import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../../components';
import { useDispatch } from 'react-redux';
import { RESET_PRODUCT_TO_CART } from '../../../actions';

const PICKUP_ADDRESS = 'Санкт-Петербург, пр. Комендантский, ТРЦ Атмосфера';

const OrderConfirmationContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [orderSummary, setOrderSummary] = useState({
		totalItems: 0,
		totalAmount: 0,
	});
	const [paymentMethod, setPaymentMethod] = useState('cash');
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const storedOrder = JSON.parse(localStorage.getItem('orderSummary'));
		if (storedOrder) {
			setOrderSummary(storedOrder);
		}
	}, []);

	const handleConfirmPayment = () => {
		setIsModalOpen(true);
		localStorage.removeItem('cart');
		localStorage.removeItem('orderSummary');
		dispatch(RESET_PRODUCT_TO_CART);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		navigate('/');
	};

	return (
		<div className={className}>
			<div className="order-summary">
				<h2>📦 Подтверждение заказа</h2>
				<p>💰 Общее количество товаров: {orderSummary.totalItems}</p>
				<p>🚚 Общая сумма заказа: {orderSummary.totalAmount}₽</p>
				<p>📍 Примерное время доставки: 14-21 день</p>
			</div>

			<div className="payment-section">
				<label htmlFor="text">Выберите способ оплаты:</label>
				<select
					value={paymentMethod}
					onChange={(e) => setPaymentMethod(e.target.value)}
				>
					<option value="cash">💵 Наличными при получении</option>
					<option value="card">💳 Картой при получении</option>
				</select>
			</div>

			<p>Адрес самовывоза: {PICKUP_ADDRESS}</p>

			<Button className="confirm-button" onClick={handleConfirmPayment}>
				✅ Оформить заказ
			</Button>

			{isModalOpen && (
				<div className="modal">
					<div className="modal-content">
						<h2>✅ Заказ оформлен!</h2>
						<p>
							Ваш заказ на сумму {orderSummary.totalAmount}₽ успешно
							оформлен.
						</p>
						<Button className="btn" onClick={handleCloseModal}>
							Закрыть
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export const OrderConfirmation = styled(OrderConfirmationContainer)`
	max-width: 500px;
	margin: 50px auto;
	padding: 30px;
	background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
	color: white;
	border-radius: 15px;
	text-align: center;
	box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
	font-family: 'Poppins', sans-serif;

	h2 {
		margin-bottom: 20px;
		font-size: 24px;
		color: #6c5ce7;
	}

	.order-summary {
		background: rgba(255, 255, 255, 0.1);
		padding: 15px;
		border-radius: 10px;
		margin-bottom: 20px;
	}

	.order-summary p {
		font-size: 16px;
		margin: 8px 0;
	}

	.payment-section {
		margin: 20px 0;
		text-align: left;
	}

	label {
		font-size: 16px;
		display: block;
		margin-bottom: 8px;
	}

	select {
		width: 100%;
		padding: 10px;
		font-size: 16px;
		border-radius: 8px;
		border: none;
		background: #6c5ce7;
		color: white;
		cursor: pointer;
	}

	select:focus {
		outline: none;
		box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.3);
	}

	.confirm-button {
		margin-top: 20px;
		padding: 12px;
		font-size: 18px;
		width: 100%;
		background: #6c5ce7;
		border-radius: 10px;
		box-shadow: 0px 4px 10px rgba(108, 92, 231, 0.4);
		transition: 0.3s;
		display: flex;
		justify-content: center;
	}

	.confirm-button:hover {
		transform: scale(1.05);
		background: #4a40a3;
	}

	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal-content {
		background: white;
		padding: 20px;
		border-radius: 10px;
		text-align: center;
		color: black;
	}

	.btn {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		width: auto;
		height: 32px;
		background: #16213e;
		color: #fff;
		border: none;
		margin-left: 120px;
	}
`;
