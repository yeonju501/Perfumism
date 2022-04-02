import styled from "styled-components";

interface AnswerProps {
	surveyItem: { url?: string; content: string };
	number: number;
	answerHandleChange: (answer: number) => void;
}

function Answer({ surveyItem, number, answerHandleChange }: AnswerProps) {
	const answerHandleClick = () => answerHandleChange(number);

	return (
		<Container onClick={answerHandleClick}>
			{surveyItem["url"] ? (
				<>
					<SurveyImg src={surveyItem["url"]} />
					<Content>{surveyItem["content"]}</Content>
				</>
			) : (
				<TextAnswer>{surveyItem["content"]}</TextAnswer>
			)}
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 0 auto;
	&:hover {
		filter: brightness(65%);
		cursor: pointer;
	}
`;

const SurveyImg = styled.img`
	background-color: none;
	border: none;
	width: 250px;
	height: 170px;
`;

const Content = styled.p`
	font-size: 2.5rem;
	text-align: center;
	margin: 1.5rem;
`;

const TextAnswer = styled.button`
	width: 70rem;
	font-size: 2.5rem;
	padding: 1rem;
	border: 1px solid;
	margin: 2rem auto;
	cursor: pointer;

	&:hover {
		transition: 0.5s;
		background-color: #000;
		color: #fff;
	}
`;

export default Answer;
