import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	margin: 5rem auto;
	display: flex;
	font-size: 1.4rem;
	@media ${(props) => props.theme.mobileS} {
		justify-content: center;
	}
`;

export const FormContainer = styled.form``;
