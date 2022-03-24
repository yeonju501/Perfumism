import SeaSrc from "assets/바다.jpg";
import styled from "styled-components";

function Answer() {
	return (
		<Container>
			<SurveyImg src={SeaSrc} />
			<Content>바다</Content>
		</Container>
	);
}

const Container = styled.div`
	width: 20rem;
	display: flex;
	flex-direction: column;
	margin: 4px;
`;

const SurveyImg = styled.img`
	background-color: none;
	border: none;
`;

const Content = styled.p`
	font-size: 1rem;
`;

export default Answer;
