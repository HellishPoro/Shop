import styled from 'styled-components';
import { PROP_TYPE } from '../../constants';

const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Error = ({ error }) =>
	error && (
		<Div>
			<h2>Ошибка</h2>
			<div>{error}</div>
		</Div>
	);

Error.protoTypes = {
	error: PROP_TYPE.ERROR,
};
