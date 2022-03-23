import styled from "styled-components";
import { Link } from "react-router-dom";

const Button = styled(Link)`
	width: 35rem;
	color: inherit;
	text-align: center;
	text-decoration: none;
	font-size: 2.5rem;
	font-weight: 700;
	position: absolute;
	padding: 2rem;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	border: 1px solid #000;
`;

export default Button;
