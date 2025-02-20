import styled from 'styled-components';
import { Button } from '../button/button';
import { useSelector } from 'react-redux';
import {
	selectModalIsOpen,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalText,
} from '../../selectors';
import { FaExclamationCircle } from 'react-icons/fa';

const ModalContainer = ({ className }) => {
	const text = useSelector(selectModalText);
	const isOpen = useSelector(selectModalIsOpen);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);

	if (!isOpen) {
		return null;
	}

	return (
		<div
			className={className}
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
		>
			<div className="overlay" onClick={onCancel} />
			<div className="modal-content">
				<div className="icon-container">
					<FaExclamationCircle className="warning-icon" />
				</div>
				<h3 id="modal-title" className="modal-title">
					{text}
				</h3>
				<div className="button-group">
					<Button onClick={onConfirm} className="confirm-btn">
						Да
					</Button>
					<Button onClick={onCancel} className="cancel-btn">
						Нет
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	z-index: 1000;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(6px);
	}

	.modal-content {
		position: relative;
		background: white;
		border-radius: 16px;
		padding: 32px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
		width: 90%;
		max-width: 400px;
		text-align: center;
	}

	.icon-container {
		margin-bottom: 20px;
		display: flex;
		justify-content: center;
	}

	.warning-icon {
		font-size: 50px;
		color: #ff4757;
	}

	.modal-title {
		color: #2d3436;
		font-size: 1.3rem;
		margin: 0 0 24px;
		line-height: 1.4;
		font-weight: 600;
	}

	.button-group {
		display: flex;
		gap: 16px;
		justify-content: center;
		margin-top: 16px;
	}

	.confirm-btn {
		background: #ff4757;
		border: none;
		color: white;
		font-size: 16px;
		padding: 12px 20px;
		border-radius: 10px;
		cursor: pointer;

		&:hover {
			background: #ff6b81;
		}
	}

	.cancel-btn {
		background: #f1f2f6;
		color: #2d3436;
		border: 1px solid #dcdde1;
		font-size: 16px;
		padding: 12px 20px;
		border-radius: 10px;
		cursor: pointer;

		&:hover {
			background: #dfe4ea;
		}
	}
`;
