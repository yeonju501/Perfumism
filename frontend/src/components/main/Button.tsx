import styled from "styled-components";
import { Link } from "react-router-dom";

const Button = styled(Link)`
	width: 30rem;
	color: inherit;
	text-align: center;
	text-decoration: none;
	font-size: 2.5rem;
	padding: 1rem;
	border: 1px solid #000;
	margin: 0 auto;

	&:hover {
		background-color: #000;
		color: #fff;
		transition: 0.5s;
	}
`;

export default Button;
