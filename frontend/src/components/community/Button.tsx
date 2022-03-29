import styled from "styled-components";

const Button = styled.button`
	width: 10rem;
	color: inherit;
	text-align: center;
	text-decoration: none;
	padding: 1rem;
	border: 1px solid #000;
	cursor: pointer;

	&:hover {
		transition: 0.5s;
		background-color: #000;
		color: #fff;
	}
`;

export default Button;
