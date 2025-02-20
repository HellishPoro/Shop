import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../components';
import BASKET from '../../../../img/корзина.png';
import EXIT from '../../../../img/выход.png';
import USERS from '../../../../img/пользователи.png';
import NEWPRODUCT from '../../../../img/новыйТовар.png';
import { ROLE } from '../../../../constants/role';
import { selectUserRole, selectUserLogin } from '../../../../selectors';
import { clearCart, logout } from '../../../../actions';
import styled from 'styled-components';
import { selectUserId } from '../../../../selectors/select-user-id';

const Right = styled.div`
	display: flex;
	justify-content: flex-end;
	position: fixed;
	margin-left: 273px;
	color: #fff;
`;

const Left = styled.div`
	display: flex;
	justify-content: flex-end;
	position: relative;
	left: 338px;
	color: #fff;
`;

const ControlPanelContainer = ({ className }) => {
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const userId = useSelector(selectUserId);

	const onLogout = () => {
		dispatch(logout());
		dispatch(clearCart());
		sessionStorage.removeItem('userData');
		localStorage.removeItem(`cart_${userId}`);
	};

	return (
		<div className={className}>
			<Right>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link className="link" to="/login">
							Войти
						</Link>
					</Button>
				) : (
					<>
						<div className="login">{login}</div>
						<img
							className="exit"
							src={EXIT}
							alt="Выход"
							height="25px"
							width="25px"
							onClick={onLogout}
						/>
					</>
				)}
			</Right>
			<Left>
				{roleId === ROLE.ADMIN && (
					<>
						<Link className="basket-and-users-and-product" to="/products">
							<img
								className="new-product"
								src={NEWPRODUCT}
								alt="новый товар"
								height="45px"
								width="45px"
							/>
						</Link>
						<Link className="basket-and-users-and-product" to="/users">
							<img
								className="users"
								src={USERS}
								alt="пользователи"
								height="45px"
								width="45px"
							/>
						</Link>
					</>
				)}
				<Link className="basket-and-users-and-product" to="/basket-of-goods">
					<img src={BASKET} alt="корзина" height="55px" width="55px" />
				</Link>
			</Left>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	.link {
		text-decoration: none;
		color: #fff;
		background: #16213e;
	}

	.login {
		position: relative;
		top: 7px;
		right: 10px;
		font-weight: 500;
		font-size: larger;
		cursor: default;
	}

	.basket-and-users-and-product {
		display: flex;
		top: 60px;
		position: absolute;
	}

	.users {
		position: relative;
		top: 7px;
		right: 70px;
	}

	.new-product {
		position: relative;
		right: 130px;
	}

	.exit {
		top: 10px;
		position: relative;
		cursor: pointer;
	}
`;
