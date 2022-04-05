import styled from "styled-components";

const ContentInput = styled.textarea`
	width: 100%;
	height: 60rem;
	line-height: 5rem;
	border: 1px solid #dde0e2;
	padding: 0 1.6rem;
	&:focus {
		outline: none;
	}
`;

export default ContentInput;
