import { TableRow, UserRow } from './components';
import { useEffect, useState } from 'react';
import { PrivateContent, Load } from '../../components';
import styled from 'styled-components';
import { checkAccess } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectUserRole } from '../../selectors';
import { hideLoading, showLoading } from '../../actions';
import { request } from '../../utils/request';
import { ROLE } from '../../constants';

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
	const userRole = useSelector(selectUserRole);
	const isLoading = useSelector(selectIsLoading);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(showLoading());
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			dispatch(hideLoading());
			return;
		}

		Promise.all([request('/users'), request('/users/roles')]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}

				setUsers(usersRes.data);
				setRoles(rolesRes.data);
				dispatch(hideLoading());
			},
		);
	}, [shouldUpdateUserList, dispatch, userRole]);

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		request(`/users/${userId}`, 'DELETE').then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList);
		});
	};

	return (
		<>
			{isLoading ? (
				<Load />
			) : (
				<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
					<div className={className}>
						<h2 className="header">Зарегистрированные пользователи</h2>
						<div>
							<TableRow>
								<div className="login-column">Логин</div>
								<div className="registered-at-column">
									Дата регистрации
								</div>
								<div className="role-column">Роль</div>
							</TableRow>
							{users.map(({ id, login, registeredAt, roleId }) => (
								<UserRow
									key={id}
									id={id}
									login={login}
									registeredAt={registeredAt}
									roleId={roleId}
									onUserRemove={() => onUserRemove(id)}
									roles={roles.filter(
										({ id: roleId }) => roleId !== ROLE.GUEST,
									)}
								/>
							))}
						</div>
					</div>
				</PrivateContent>
			)}
		</>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	width: 600px;
	color: #d7d7d7;

	.header {
		margin-bottom: 60px;
	}
`;
