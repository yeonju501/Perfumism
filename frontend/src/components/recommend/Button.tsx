import styled from "styled-components";
import { Link } from "react-router-dom";

const Button = styled(Link)`
	width: 60rem;
	color: inherit;
	text-align: center;
	text-decoration: none;
	padding: 1rem;
	border: 1px solid #000;
	margin: 2rem auto;

	&:hover {
		transition: 0.5s;
		background-color: #000;
		color: #fff;
	}
`;

export default Button;
