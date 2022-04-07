import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Answer } from "components/recommend";

interface SurveyItemProps {
	queryString: string;
	surveyListItem: {
		answerNumber: string;
		question: string;
		answer: { url?: string; content: string }[];
	};
}

interface SectionProps {
	nowPage: string;
}

function SurveyItem({ queryString, surveyListItem }: SurveyItemProps) {
	const navigate = useNavigate();

	const getNextUrl = () => {
		const nextPage = Number(surveyListItem.answerNumber) + 1;
		const newUrl =
			queryString.replace(surveyListItem.answerNumber, String(nextPage)) +
			"&a" +
			surveyListItem.answerNumber +
			"=";
		return newUrl;
	};

	const nextPage = (strAnswer: string) => {
		const nextUrl = getNextUrl() + strAnswer;
		if (surveyListItem.answerNumber === "5") {
			navigate({
				pathname: "/loading",
				search: nextUrl,
			});
		} else {
			navigate({
				pathname: "/survey",
				search: nextUrl,
			});
		}
	};

	const answerHandleChange = (answer: number) => {
		const strAnswer = String(answer);
		nextPage(strAnswer);
	};

	return (
		<Container>
			<Title>{surveyListItem.question}</Title>
			<Section nowPage={surveyListItem.answerNumber}>
				{surveyListItem.answer.map((surveyItem: { url?: string; content: string }, idx: number) => (
					<Answer
						key={idx}
						surveyItem={surveyItem}
						number={idx}
						answerHandleChange={answerHandleChange}
					/>
				))}
			</Section>
		</Container>
	);
}

const Container = styled.div`
	height: 100%;
`;

const Title = styled.h1`
	color: #000;
	font-size: 4rem;
	font-weight: 800;
	text-align: center;
	margin: 5% auto 2%;
	@media ${(props) => props.theme.mobileS} {
		font-size: 3rem;
	}
	@media ${(props) => props.theme.mobileXS} {
		font-size: 2.5rem;
	}
`;

const Section = styled.section<SectionProps>`
	display: ${({ nowPage }) => (+nowPage < 3 ? "grid" : "flex")};
	flex-direction: column;

	grid-template-columns: ${({ nowPage }) => (+nowPage < 3 ? "repeat(2, 1fr)" : "null")};
	width: ${({ nowPage }) => (+nowPage < 3 ? "50%" : "100%")};
	margin: 0 auto;
	@media ${(props) => props.theme.mobileXS} {
		grid-template-columns: ${({ nowPage }) => (+nowPage < 3 ? "repeat(1, 1fr)" : "null")};
	}
	@media ${(props) => props.theme.tabletS} {
		width: ${({ nowPage }) => (+nowPage < 3 ? "80%" : "100%")};
	}
`;

export default SurveyItem;
