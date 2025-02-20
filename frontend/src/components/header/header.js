import { ControlPanel, Logo } from './components';
import styled from 'styled-components';

const HeaderContainer = ({ className }) => {
	return (
		<header className={className}>
			<Logo />
			<ControlPanel />
		</header>
	);
};

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: center;
	position: fixed;
	width: -webkit-fill-available;
	height: 110px;
	padding: 20px 25px;
	border-bottom: 2px solid #d39125;
	z-index: 2;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(45deg, #1a1a2e 0%, #16213e 100%);
		z-index: 0;
	}
`;
