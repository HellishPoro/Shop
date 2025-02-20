import Image from '../../img/лого.png';
import { Link } from 'react-router-dom';
import { Information } from './information';
import { Company } from './company';
import styled from 'styled-components';

const FooterContainer = ({ className }) => {
	return (
		<div className={className}>
			<div>
				<Link to="/">
					<img className="img" src={Image} alt="logo" />
				</Link>
			</div>
			<Company />
			<Information />
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: center;
	background: linear-gradient(45deg, #1a1a2e 0%, #16213e 100%);
	border-top: 1px solid #d39125;
	height: 213px;

	.img {
		right: 90px;
		top: 55px;
		position: relative;
	}
`;
