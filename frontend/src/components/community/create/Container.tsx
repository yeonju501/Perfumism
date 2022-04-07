import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 5rem 25%;
	@media ${(props) => props.theme.mobile} {
		margin: 5rem 15%;
	}
	@media ${(props) => props.theme.mobileXS} {
		margin: 5rem 5%;
	}
`;

export const FormContainer = styled.form`
	display: flex;
	position: relative;
	width: 100%;
	flex-direction: column;
	justify-content: center;
`;

export const Header = styled.header`
	display: flex;
	align-items: center;
`;
export const Footer = styled.footer`
	display: flex;
	justify-content: space-between;
	margin-bottom: 2rem;
`;
