import DELETE from '../../../../img/удаление.png';
import SAVE from '../../../../img/сохранить.png';
import styled from 'styled-components';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { PROP_TYPE } from '../../../../constants';
import { request } from '../../../../utils/request';
import { formatDate } from '../../../../hooks';

export const UserRowContainer = ({
	className,
	id,
	login,
	registeredAt,
	roleId: userRoleId,
	roles,
	onUserRemove,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};

	const onRoleSave = (userId, newUserRoleId) => {
		request(`/users/${userId}`, 'PATCH', { roleId: newUserRoleId }).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};

	const isSaveButtonDisabled = selectedRoleId === initialRoleId;

	const roleTranslations = {
		Admin: 'Администратор',
		Buyer: 'Покупатель',
	};

	return (
		<div className={className}>
			<div className="table">
				<div className="login">{login}</div>
				<div className="registered-at">{formatDate(registeredAt)}</div>
				<div className="role">
					<select value={selectedRoleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleTranslations[roleName] || roleName}
							</option>
						))}
					</select>
					<div className="save-button" disabled={isSaveButtonDisabled}>
						<img
							src={SAVE}
							alt="Сохранить"
							height="25px"
							width="25px"
							onClick={() => onRoleSave(id, selectedRoleId)}
						/>
					</div>
				</div>
				<img
					className="delete"
					src={DELETE}
					alt="Удалить"
					height="25px"
					width="25px"
					onClick={onUserRemove}
				/>
			</div>
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	justify-content: flex-start;

	.table {
		display: flex;
		align-items: center;
		border-radius: 20px;
		background: linear-gradient(45deg, #1a1a2e 0%, #16213e 100%);
		width: 580px;
		margin-top: 10px;
		padding: 5px;
	}

	.login {
		width: 175px;
		position: relative;
		left: 7px;
	}

	.registered-at {
		width: 200px;
		position: relative;
		left: 37px;
	}

	.role {
		width: auto;
		position: relative;
		top: 14px;
	}

	.role-column {
		display: flex;
		align-items: center;
		left: 115px;
		position: relative;
	}

	.save-button {
		position: relative;
		left: 135px;
		bottom: 22px;
		cursor: pointer;
	}

	.save-button[disabled] {
		opacity: 0;
	}

	.delete {
		left: 50px;
		position: relative;
		margin-top: 3px;
		cursor: pointer;
	}
`;

UserRow.propTypes = {
	id: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	registeredAt: PropTypes.string.isRequired,
	roleId: PROP_TYPE.ROLE_ID.isRequired,
	roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	onUserRemove: PropTypes.func.isRequired,
};
