import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Image from '../../../../img/лого.png';

const LogoContainer = ({ className }) => (
	<div className={className}>
		<Link className="link-img" to="/">
			<img className="img" src={Image} alt="logo" />
		</Link>
	</div>
);

export const Logo = styled(LogoContainer)`
	.link-img {
		right: 360px;
		bottom: 85px;
		position: relative;
	}

	.img {
		top: 85px;
		position: relative;
	}
`;
