import PropTypes from 'prop-types';
import styled from 'styled-components';

const CustomButtonContainer = ({ className, children, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const CustomButton = styled(CustomButtonContainer)`
	font-size: 1.5rem;
	color: #b1b0b0;
	text-transform: uppercase;
	padding: 10px 20px;
	border-radius: 10px;
	border: 2px solid #b1b0b0;
	background: linear-gradient(45deg, #1a1a2e 0%, #16213e 100%);
	box-shadow: 3px 3px #b1b0b0;
	cursor: pointer;
	margin: 35px 0;

	&:active {
		box-shadow: none;
		transform: translate(3px, 3px);
	}
`;

CustomButton.propTypes = {
	children: PropTypes.node.isRequired,
};
