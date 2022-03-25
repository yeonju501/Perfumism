import SeaSrc from "assets/바다.jpg";
import styled from "styled-components";

interface AnswerProps {
	surveyItem: { url: string; content: string };
	number: number;
	answerHandleChange: (answer: number) => void;
}

function Answer({ surveyItem, number, answerHandleChange }: AnswerProps) {
	const answerHandleClick = () => answerHandleChange(number);

	return (
		<Container onClick={answerHandleClick}>
			<SurveyImg src={surveyItem["url"]} />
			<Content>{surveyItem["content"]}</Content>
		</Container>
	);
}

const Container = styled.div`
	width: 25rem;
	display: flex;
	flex-direction: column;
	margin: 0 5rem;
`;

const SurveyImg = styled.img`
	background-color: none;
	border: none;
	&:hover {
		filter: brightness(65%);
		cursor: pointer;
	}
`;

const Content = styled.p`
	font-size: 2.5rem;
	text-align: center;
	margin: 1.5rem;
`;

export default Answer;
