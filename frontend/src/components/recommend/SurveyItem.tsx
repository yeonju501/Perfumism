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
`;

const Section = styled.section<SectionProps>`
	display: flex;
	flex-direction: ${({ nowPage }) => (nowPage === "1" || nowPage === "2" ? "row" : "column")};
	flex-wrap: wrap;
	justify-content: center;
	margin: 0 20rem;
`;

export default SurveyItem;
