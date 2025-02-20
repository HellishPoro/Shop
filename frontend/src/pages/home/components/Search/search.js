import PropTypes from 'prop-types';
import { Input } from '../../../../components/input/input';
import styled from 'styled-components';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				placeholder="Поиск товаров"
				className="input"
				name="text"
				type="text"
				value={searchPhrase}
				onChange={onChange}
			/>
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	justify-content: center;
	margin: 30px 0 20px 0;

	.input {
		max-width: 400px;
		height: 30px;
		border: 2px solid transparent;
		outline: none;
		border-bottom: 2px solid #16213e;
		caret-color: #ddd;
		background-color: #16213e;
		padding: 5px;
		transition: 0.5s linear;
		font-family: monospace;
		letter-spacing: 1px;
	}

	.input:focus {
		border: 2px solid #d39125;
		caret-color: #d39125;
		color: #d39125;
		box-shadow: 4px 4px 10px #070707;
	}

	& .input:focus::placeholder {
		color: #d39125;
	}
`;

Search.propTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
