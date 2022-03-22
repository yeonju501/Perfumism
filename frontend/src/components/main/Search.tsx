import styled from "styled-components";

interface InputProps {
	isOn: boolean;
}

function Search() {
	return;
}

export default Search;

const Input = styled.input<InputProps>`
	width: 20rem;
	height: 3rem;
	padding: 1rem;
	position: absolute;
	display: ${({ isOn }) => (isOn ? "block" : "none")};
	border-radius: 0.5rem;
	transform: ${({ isOn }) => isOn && "translateX(-19rem)"};
	&:focus {
		outline: none;
	}
`;
