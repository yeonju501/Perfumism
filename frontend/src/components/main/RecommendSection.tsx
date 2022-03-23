import { Link } from "react-router-dom";
import styled from "styled-components";
import Background from "assets/background.webp";

interface SectionProps {
	image: string;
}

function RecommendSection() {
	return (
		<Section image={Background}>
			<Button to="/recommend">추천 페이지 바로가기</Button>
		</Section>
	);
}

export default RecommendSection;

const Section = styled.section<SectionProps>`
	width: 100%;
	height: 70rem;
	background-image: url(${Background});
`;

const Button = styled(Link)`
	width: 35rem;
	color: inherit;
	text-align: center;
	text-decoration: none;
	font-size: 2.5rem;
	font-weight: 700;
	position: absolute;
	padding: 2rem;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	border: 1px solid #000;
`;
