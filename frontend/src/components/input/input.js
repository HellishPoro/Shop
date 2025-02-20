import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import styled from 'styled-components';

const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
	return <input className={className} {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
	width: ${({ width = '100%' }) => width};
	height: 30px;
	margin: 0 0 10px;
	padding: 10px 55px 10px 10px;
	border: none;
	border-radius: 20px;
`;

Input.propTypes = {
	width: PropTypes.string,
};
