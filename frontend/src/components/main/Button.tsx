import styled from "styled-components";
import { Link } from "react-router-dom";

const Button = styled(Link)`
	width: 35rem;
	color: inherit;
	text-align: center;
	text-decoration: none;
	font-size: 2.5rem;
	font-weight: 700;
	padding: 2rem;
	border: 1px solid #000;
	margin: 0 auto;
`;

export default Button;
