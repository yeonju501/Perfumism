import styled from "styled-components";

interface ButtonProps {
	backgroundColor?: string;
	color?: string;
}

const Button = styled.button<ButtonProps>`
	width: 50rem;
	background-color: ${({ backgroundColor }) => backgroundColor};
	border: none;
	color: ${({ color }) => color};
	height: 5rem;
	font-weight: bold;
	font-size: 1.6rem;
	margin-bottom: 1rem;

	&:hover {
		cursor: pointer;
	}
	@media ${(props) => props.theme.mobileS} {
		width: 30rem;
		margin: 0.5rem auto;
	}
`;

export default Button;
