import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../actions/set-user';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants/role';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { useResetFrom } from '../../hooks';
import { Button, Input } from '../../components';
import { request } from '../../utils/request';

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверно заполнин логин. Допускаются только буквы и цифры')
		.min(5, 'Неверно заполнен логин. Минимум 5 символов')
		.max(15, 'Неверно заполнен логин.  Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %',
		)
		.min(5, 'Неверно заполнен пароль. Минимум 5 символов')
		.max(20, 'Неверно заполнен пароль.  Максимум 20 символов'),
	passcheck: yup
		.string()
		.required('Заполните повтор пароля')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

const RegistrationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);

	useResetFrom(reset);

	const onSubmit = ({ login, password }) => {
		request('/register', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<form className="form" onSubmit={handleSubmit(onSubmit)}>
				<h2 className="header">Регистрация</h2>
				<span className="input-span">
					<label htmlFor="text" className="label">
						Логин
					</label>
					<Input
						type="text"
						placeholder="Логин..."
						{...register('login', {
							onChange: () => setServerError(null),
						})}
					/>
				</span>
				<span className="input-span">
					<label htmlFor="password" className="label">
						Пароль
					</label>
					<Input
						type="password"
						placeholder="Пароль..."
						{...register('password', {
							onChange: () => setServerError(null),
						})}
					/>
				</span>
				<span className="input-span">
					<label htmlFor="password" className="label">
						Повторите пароль
					</label>
					<Input
						type="password"
						placeholder="Повторите пароль..."
						{...register('passcheck', {
							onChange: () => setServerError(null),
						})}
					/>
				</span>
				<Button className="submit" type="submit" disabled={!!formError}>
					Зарегистрироваться
				</Button>
				{errorMessage && <div className="errorMessage">{errorMessage}</div>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	margin-top: 20px;
	color: #fff;

	.header {
		left: 9px;
		position: relative;
	}

	.form {
		--bg-light: #efefef;
		--bg-dark: #707070;
		--clr: #58bc82;
		--clr-alpha: #9c9c9c60;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		max-width: 500px;
		width: 277px;
	}

	.form .input-span {
		width: 170%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form input[type='text'],
	.form input[type='password'] {
		color: #fff;
		border-radius: 0.5rem;
		padding: 1rem 0.75rem;
		width: 100%;
		border: none;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background-color: var(--clr-alpha);
		outline: 2px solid var(--bg-dark);
		height: 10px;
	}

	.form input[type='text']:focus,
	.form input[type='password']:focus {
		outline: 2px solid var(--clr);
	}

	.label {
		align-self: flex-start;
		color: var(--clr);
		font-weight: 600;
	}

	.form .submit {
		padding: 1rem 0.75rem;
		width: 160%;
		border-radius: 3rem;
		background-color: var(--bg-dark);
		color: var(--bg-light);
		border: none;
		cursor: pointer;
		transition: all 300ms;
		font-weight: 600;
		font-size: 0.9rem;
		margin-left: 20px;
	}

	.form .submit:hover {
		background-color: var(--clr);
		color: var(--bg-dark);
	}

	.errorMessage {
		left: 10px;
		position: relative;
		background-color: #4d1818;
		color: var(--bg-light);
		border-radius: 3rem;
		cursor: default;
		padding: 0.8rem 2.75rem;
	}
`;
