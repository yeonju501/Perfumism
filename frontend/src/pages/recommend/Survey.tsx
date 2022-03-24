import { useSearchParams, useLocation } from "react-router-dom";
import SurveyItem from "components/recommend/SurveyItem";
import styled from "styled-components";

function Survey() {
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get("page");
	const queryString = useLocation().search;
	const surveyList = [
		{ 질문: "질문1", 답변: ["a1", "a2", "a3", "a4"] },
		{ 질문: "질문2", 답변: ["a1", "a2", "a3", "a4", "a5"] },
		{ 질문: "질문3", 답변: ["a1", "a2", "a3", "a4"] },
		{ 질문: "질문4", 답변: ["a1", "a2", "a3", "a4", "a5"] },
		{ 질문: "질문5", 답변: ["a1", "a2", "a3", "a4"] },
	];

	return (
		<Container>
			{page === "1" ? (
				<SurveyItem queryString={queryString} surveyListItem={surveyList[0]} />
			) : null}
			{page === "2" ? (
				<SurveyItem queryString={queryString} surveyListItem={surveyList[1]} />
			) : null}
			{page === "3" ? (
				<SurveyItem queryString={queryString} surveyListItem={surveyList[2]} />
			) : null}
			{page === "4" ? (
				<SurveyItem queryString={queryString} surveyListItem={surveyList[3]} />
			) : null}
			{page === "5" ? (
				<SurveyItem queryString={queryString} surveyListItem={surveyList[4]} />
			) : null}
		</Container>
	);
}

const Container = styled.div`
	height: 80vh;
	font-size: 1.5rem;
	display: flex;
	flex-direction: column;
`;

export default Survey;
