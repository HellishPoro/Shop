import styled from 'styled-components';

const InformationComponentContainer = ({ className }) => (
	<div className={className}>
		<ul className="info">
			<li>
				<span className="sity">г. Санкт-Петербург, пр. Комендантский</span>
			</li>
			<li>
				<div className="box">
					<span className="link">+7 (949) 125 94 45</span>
				</div>
			</li>
			<li>
				<div>
					<span className="link">gj@ges.store</span>
				</div>
			</li>
		</ul>
	</div>
);

export const Information = styled(InformationComponentContainer)`
	.info {
		display: flex;
		flex-direction: column;
		list-style-type: none;
		font-family: 'PT Root UI';
		color: #fff;
		margin: 40px 0 0 0;
	}

	.box {
		margin-top: 10px;
		margin-bottom: 5px;
	}

	.link {
		color: #fff;
		text-decoration: none;
		font-weight: bold;
		font-size: 16px;
	}
`;
