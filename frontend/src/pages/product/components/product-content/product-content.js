import styled from 'styled-components';
import DELETE from '../../../../img/удаление.png';
import EDIT from '../../../../img/новыйТовар.png';
import { CustomButton } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
	CLOSE_MODAL,
	openModal,
	removeProductAsync,
	updateProductToCart,
} from '../../../../actions';
import { useNavigate } from 'react-router-dom';
import { selectCart, selectUserRole } from '../../../../selectors';
import { ROLE } from '../../../../constants/role';
import { PROP_TYPE } from '../../../../constants';
const ProductContentContainer = ({
	className,
	product: {
		_id: id,
		title,
		image,
		content,
		price,
		design,
		comfort,
		materials,
		functionality,
	},
}) => {
	const roleId = useSelector(selectUserRole);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isAuthenticated = useSelector(selectUserRole);
	const productCart = useSelector(selectCart);

	const onProductRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить продукт?',
				onConfirm: () => {
					dispatch(removeProductAsync(id)).then(() => {
						navigate('/');
					});
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const handleSetProductToCart = productCart.some((item) => item.id === id);

	const addToCart = () => {
		dispatch(updateProductToCart({ id, title, price, image }));
	};

	const clickToLogin = () => {
		navigate('/login');
	};

	return (
		<div className={className}>
			<img className="image" src={image} alt={title} />
			{roleId === ROLE.ADMIN ? (
				<div className="box">
					<img
						className="edit"
						src={EDIT}
						alt="Изменить"
						width="35px"
						height="35px"
						onClick={() => navigate(`/products/${id}/edit`)}
					/>
					<img
						className="delete"
						src={DELETE}
						alt="Удалить"
						width="35px"
						height="35px"
						onClick={() => onProductRemove(id)}
					/>
				</div>
			) : (
				<></>
			)}
			<div className="container">
				<h2 className="title">{title}</h2>
				<ul>
					<li>{design}</li>
					<li>{comfort}</li>
					<li>{materials}</li>
					<li>{functionality}</li>
				</ul>
				<div className="purchase">
					{isAuthenticated === ROLE.GUEST ? (
						<CustomButton
							disabled={handleSetProductToCart}
							onClick={clickToLogin}
						>
							Авторизуйтесь чтобы добавить товар
						</CustomButton>
					) : (
						<CustomButton
							disabled={handleSetProductToCart}
							onClick={addToCart}
						>
							{handleSetProductToCart ? 'В корзине' : 'Добавить в корзину'}
						</CustomButton>
					)}

					<div className="price">{price} ₽</div>
				</div>
			</div>
			<div className="content">{content}</div>
			<div className="article">Артикул: {id}</div>
		</div>
	);
};

export const ProductContent = styled(ProductContentContainer)`
	padding: 20px 300px;
	margin-top: 40px;
	color: #b1b0b0;
	font-family: 'PT Root UI';
	font-size: 18px;
	line-height: 26px;
	font-weight: 300;
	padding: 0 0 15px 30px;
	cursor: alias;

	.article {
		display: flex;
		justify-content: flex-end;
	}

	.box {
		display: flex;
		justify-content: flex-end;
	}

	.edit {
		cursor: pointer;
	}

	.delete {
		padding-left: 10px;
		cursor: pointer;
	}

	li {
		margin-bottom: 20px;
	}

	.purchase {
		display: flex;
		align-items: center;
		flex-direction: row-reverse;
		justify-content: space-evenly;
	}

	.button {
		margin: 0 20px 0 0;
	}

	.price {
		font-size: 38px;
	}

	.image {
		border-radius: 30px;
		width: 450px;
		height: 450px;
		float: left;
		margin-right: 30px;
	}

	.title {
		font-family: 'Furore';
		font-size: 38px;
		margin: 0 0 40px 0;
	}

	.content {
		font-size: 20px;
		margin-top: 80px;
		white-space: pre-line;
	}
`;

ProductContent.propTypes = {
	product: PROP_TYPE.PRODUCT.isRequired,
};
