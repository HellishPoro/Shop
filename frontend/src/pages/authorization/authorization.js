import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../actions/set-user';
import { selectUserRole } from '../../selectors';
import styled from 'styled-components';
import { ROLE } from '../../constants/role';
import { Link, Navigate } from 'react-router-dom';
import { useResetFrom } from '../../hooks';
import { Button, Input } from '../../components';
import { request } from '../../utils/request';

const authoFormSchema = yup.object().shape({
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
});

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authoFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);

	useResetFrom(reset);

	const onSubmit = ({ login, password }) => {
		request('/login', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<form className="form" onSubmit={handleSubmit(onSubmit)}>
				<h2 className="header">Авторизация</h2>
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
				<Button className="submit" type="submit" disabled={!!formError}>
					Авторизоваться
				</Button>
				{errorMessage && <div className="errorMessage">{errorMessage}</div>}
				<span className="span">
					У вас нет учетной записи?{' '}
					<Link to="/register">Зарегистрироваться</Link>
				</span>
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	margin-top: 40px;
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
		width: 100%;
		max-width: 500px;
		width: 380px;
	}

	.form .input-span {
		width: 100%;
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
		width: 100%;
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

	.form .submit:disabled {
		background-color: var(--clr);
		color: var(--bg-dark);
		cursor: not-allowed;
	}

	.span {
		text-decoration: none;
		color: var(--bg-dark);
		margin-left: 20px;
	}

	.span a {
		color: var(--clr);
	}

	.errorMessage {
		width: 200px;
		left: 10px;
		position: relative;
		background-color: #4d1818;
		color: var(--bg-light);
		border-radius: 3rem;
		cursor: default;
		padding: 1rem 2.75rem;
	}

	.error {
	}
`;
