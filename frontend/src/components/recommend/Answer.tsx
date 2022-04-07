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
	margin: 0 auto;
	&:hover {
		filter: brightness(65%);
		cursor: pointer;
	}
`;
const SurveyImg = styled.img`
	background-color: none;
	border: none;
	width: 100%;
	height: 17rem;
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
	background-color: #fff;

	@media ${(props) => props.theme.mobile} {
		width: 60rem;
	}
	@media ${(props) => props.theme.mobileS} {
		margin: 1rem auto;
		width: 45rem;
		font-size: 1.8rem;
	}
	@media ${(props) => props.theme.mobileXS} {
		margin: 1rem auto;
		width: 35rem;
		font-size: 1.5rem;
	}

	&:hover {
		transition: 0.5s;
		background-color: #000;
		color: #fff;
	}
`;

export default Answer;
