import styled from "styled-components";

interface SectionProps {
	image: string;
}

const Section = styled.section<SectionProps>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
	height: 80rem;
	background: ${(props) => `url(${props.image}) no-repeat top`};
`;

export default Section;
