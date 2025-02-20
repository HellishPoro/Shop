import styled from 'styled-components';

const TheCompanyContainer = ({ className }) => {
	return (
		<div className={className}>
			<h1 className="header">Gaming Elite Store</h1>

			<p>
				— это интернет-магазин, специализирующийся на производстве и продаже
				игровых кресел, мышек и клавиатур.<br></br> Все продукты производятся из
				лучших материалов и предлагаются по бюджетным ценам, делая качественные
				игровые аксессуары доступными для всех.
			</p>

			<div>
				<p>Достоинства:</p>
				<ul>
					<div className="box">
						<p>Высокое качество материалов!</p>
						<li className="info">
							{' '}
							Используются только лучшие материалы для создания прочных и
							комфортных игровых кресел и периферийных устройств.
						</li>
					</div>
					<div className="info-box">
						<p>Доступные цены!</p>
						<li className="info">
							{' '}
							Мы предлагаем конкурентоспособные цены, делая качественные
							игровые аксессуары доступными для широкой аудитории.
						</li>
					</div>
					<div className="box">
						<p>Эргономичный дизайн!</p>
						<li className="info">
							{' '}
							Все продукты разработаны с учетом анатомии и комфорта,
							обеспечивая длительные игровые сессии без усталости.
						</li>
					</div>
					<div>
						<p>Современные технологии!</p>
						<li className="info">
							{' '}
							Мы используем новейшие технологии в производстве, обеспечивая
							высокую производительность и долговечность своих продуктов.
						</li>
					</div>
				</ul>
			</div>

			<div className="target">
				<p>
					<p>Цель компании:</p>
					Предоставлять геймерам высококачественные и доступные игровые кресла и
					периферийные устройства,<br></br> которые улучшат их игровой опыт и
					обеспечат максимальный комфорт и производительность.
				</p>
			</div>
			<div className="target">
				<p>
					<p>Миссия компании:</p>
					Миссия компании заключается в том, чтобы обеспечить каждому геймеру
					доступ к качественным и эргономичным игровым аксессуарам,
					<br></br> которые помогут достигать новых высот в играх.
					<br></br> Мы стремимся к инновациям, высокому качеству и доступности,
					создавая продукты, которые отвечают потребностям современного геймера.
				</p>
			</div>
		</div>
	);
};

export const TneCompany = styled(TheCompanyContainer)`
	background: linear-gradient(45deg, #1a1a2e 0%, #16213e 100%);
	color: #d5d5d5;
	padding: 40px;
	margin-top: 0px;
	font-family: 'Roboto', sans-serif;
	border-radius: 15px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
	position: relative;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: radial-gradient(
			circle,
			rgba(255, 255, 255, 0.1) 10%,
			transparent 10.01%
		);
		background-size: 20px 20px;
		animation: moveBackground 10s linear infinite;
		z-index: 0;
	}

	@keyframes moveBackground {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.box {
		padding: 0 0 30px 90px;
		position: relative;
		z-index: 1;
	}

	.info-box {
		padding-bottom: 20px;
		position: relative;
		z-index: 1;
	}

	.header {
		display: flex;
		justify-content: center;
		color: #cacaca;
		font-size: 50px;
		text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
		position: relative;
		z-index: 1;
	}

	.info {
		list-style-type: none;
		padding-left: 20px;
		border-left: 3px solid #00ffcc;
		margin-left: 10px;
		position: relative;
		z-index: 1;
	}

	.target {
		margin-top: 35px;
		padding: 20px;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		position: relative;
		z-index: 1;
	}

	p {
		line-height: 1.6;
		position: relative;
		z-index: 1;
	}

	ul {
		padding-left: 0;
		position: relative;
		z-index: 1;
	}

	& li {
		margin-bottom: 10px;
		color: #00ffcc;
		position: relative;
		z-index: 1;
	}

	.box p,
	.info-box p {
		font-size: 20px;
		color: #00ffcc;
		text-shadow: 0 0 5px rgba(0, 255, 204, 0.5);
		position: relative;
		z-index: 1;
	}

	.glow-effect {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: radial-gradient(circle, rgba(0, 255, 204, 0.2) 0%, transparent 70%);
		pointer-events: none;
		z-index: 0;
		animation: glow 3s infinite alternate;
	}

	@keyframes glow {
		from {
			opacity: 0.5;
		}
		to {
			opacity: 1;
		}
	}
`;
