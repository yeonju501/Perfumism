import styled from "styled-components";

const PerfumeImage = styled.img`
	background-color: none;
	border: none;
	&:hover {
		filter: brightness(75%);
	}
	width: 100%;
	height: auto;
`;

export default PerfumeImage;
