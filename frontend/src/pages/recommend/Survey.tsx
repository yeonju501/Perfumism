import { useSearchParams, useLocation } from "react-router-dom";
import { SurveyItem } from "components/recommend";
import styled from "styled-components";

function Survey() {
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get("page");
	const queryString = useLocation().search;
	const surveyList = [
		{ 질문번호: "1", 질문: "질문1", 답변: ["a1", "a2", "a3", "a4"] },
		{ 질문번호: "2", 질문: "질문2", 답변: ["a1", "a2", "a3", "a4", "a5"] },
		{ 질문번호: "3", 질문: "질문3", 답변: ["a1", "a2", "a3", "a4"] },
		{ 질문번호: "4", 질문: "질문4", 답변: ["a1", "a2", "a3", "a4", "a5"] },
		{ 질문번호: "5", 질문: "질문5", 답변: ["a1", "a2", "a3", "a4"] },
	];

	return (
		<Container>
			{surveyList.map((survey, idx) =>
				page === survey["질문번호"] ? (
					<SurveyItem queryString={queryString} surveyListItem={survey} key={idx} />
				) : null,
			)}
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
