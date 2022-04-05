import styled from "styled-components";

const Button = styled.button`
	width: 10rem;
	text-align: center;
	text-decoration: none;
	padding: 1rem;
	border: 2px solid #e5e5e5;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
	background: #ffffff;
	cursor: pointer;

	&:hover {
		transition: 0.5s;
		background: #696969;
		color: #fff;
	}
`;

export default Button;
