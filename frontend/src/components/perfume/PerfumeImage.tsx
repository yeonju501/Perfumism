import styled from "styled-components";

interface PerfumeImageProps {
	favorites?: boolean;
}

const PerfumeImage = styled.img<PerfumeImageProps>`
	background-color: none;
	border: none;
	&:hover {
		filter: ${({ favorites }) => (favorites ? "brightness(100%)" : "brightness(85%)")};
	}
	width: 100%;
	height: auto;
`;

export default PerfumeImage;
