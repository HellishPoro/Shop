import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CompanyContainer = ({ className }) => {
	return (
		<div className={className}>
			<Link className="link" to="/brand">
				<h3 className="brand">О компании</h3>
			</Link>
		</div>
	);
};

export const Company = styled(CompanyContainer)`
	margin: 0 30px 0 60px;

	.link {
		text-decoration: none;
	}

	.brand {
		color: #fff;
	}
`;
