import styled, { css } from 'styled-components';

const buttonStyles = css`
	background-color: black;
	border: 1px solid black;
	color: white;

	&:hover {
		background-color: white;
		color: black;
	}
`;

const invertedButtonStyle = css`
	background-color: white;
	border: 1px solid black;
	color: black;

	&:hover {
		background-color: black;
		color: white;
	}
`;

const googleSignInStyle = css`
	background-color: #4285f4;
	border: 1px solid #4285f4;
	color: white;

	&:hover {
		background-color: #0e60e6;
		color: black;
	}
`;

const getButtonStyles = props => {
	if (props.isGoogleSignIn) return googleSignInStyle;
	if (props.inverted) return invertedButtonStyle;
	else return buttonStyles;
};

const CustomButtonStyle = styled.button`
	min-width: 165px;
	min-height: 50px;
	letter-spacing: 0.5px;
	line-height: 50px;
	padding: 0 35px 0 35px;
	font-size: 15px;
	text-transform: uppercase;
	font-family: 'Open Sans Condensed';
	font-weight: bolder;
	cursor: pointer;
	display: flex;
	justify-content: center;

	${getButtonStyles}
`;

export default CustomButtonStyle;
