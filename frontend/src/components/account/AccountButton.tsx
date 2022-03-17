import styled from "styled-components";

interface ButtonProps {
	backgroundColor?: string;
	color?: string;
}

const Button = styled.button<ButtonProps>`
	--background-color: ${({ backgroundColor }) => backgroundColor};
	--color: ${({ color }) => color};
	width: 50rem;
	background-color: var(--background-color);
	border: none;
	color: var(--color);
	height: 5rem;
	font-weight: bold;
	font-size: 1.6rem;
	margin-bottom: 1rem;

	&:hover {
		cursor: pointer;
	}
`;

export default Button;
