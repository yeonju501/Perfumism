import styled from "styled-components";

const ContentInput = styled.textarea`
	width: 100%;
	height: 40rem;
	font-size: 2rem;
	line-height: 3rem;
	border: 1px solid #dde0e2;
	padding: 1.5rem;
	&:focus {
		outline: none;
	}
`;

export default ContentInput;
