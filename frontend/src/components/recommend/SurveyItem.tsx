import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Answer } from "components/recommend";

interface SurveyItemProps {
	queryString: string;
	surveyListItem: { 질문번호: string; 질문: string; 답변: { url?: string; content: string }[] };
}

function SurveyItem({ queryString, surveyListItem }: SurveyItemProps) {
	const navigate = useNavigate();

	const getNextUrl = () => {
		const nextPage = Number(surveyListItem["질문번호"]) + 1;
		const newUrl =
			queryString.replace(surveyListItem["질문번호"], String(nextPage)) +
			"&a" +
			surveyListItem["질문번호"] +
			"=";
		return newUrl;
	};

	const nextPage = (strAnswer: string) => {
		const nextUrl = getNextUrl() + strAnswer;
		if (surveyListItem["질문번호"] === "5") {
			// getRecommendData();
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
			<Title>{surveyListItem["질문"]}</Title>
			<Section>
				{surveyListItem["답변"].map(
					(surveyItem: { url?: string; content: string }, idx: number) => (
						<Answer
							key={idx}
							surveyItem={surveyItem}
							number={idx}
							answerHandleChange={answerHandleChange}
						/>
					),
				)}
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

const Section = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: 0 20rem;
`;

export default SurveyItem;
