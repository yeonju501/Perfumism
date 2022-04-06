import styled from "styled-components";

const Input = styled.input`
	width: 100%;
	height: 5rem;
	border: 1px solid #dde0e2;
	padding: 0 1.6rem;

	&:focus {
		outline: none;
	}
	@media ${(props) => props.theme.mobileS} {
		width: 30rem;
		margin: 0 auto;
	}
`;

export default Input;
