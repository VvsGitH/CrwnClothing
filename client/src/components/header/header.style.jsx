import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderStyle = styled.div`
	height: 70px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-bottom: 25px;
`;

export const LogoStyle = styled(Link)`
	margin: auto 0;
`;

export const OptionsStyle = styled.nav`
	display: flex;
	align-items: center;
`;

export const OptionLinkStyle = styled(Link)`
	padding: 10px 15px;
	cursor: pointer;
`;
