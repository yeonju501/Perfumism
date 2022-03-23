import styled from "styled-components";

interface SectionProps {
	image: string;
}

export const Section = styled.section<SectionProps>`
	height: 80rem;
	background: ${(props) => `url(${props.image}) no-repeat top`};
`;
