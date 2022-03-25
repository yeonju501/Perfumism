import { useSearchParams, useLocation } from "react-router-dom";
import { SurveyItem } from "components/recommend";
import styled from "styled-components";
import SeaSrc from "assets/바다.jpg";

function Survey() {
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get("page");
	const queryString = useLocation().search;
	const surveyList = [
		{
			질문번호: "1",
			질문: "질문1",
			답변: [
				{ url: SeaSrc, content: "바다" },
				{ url: SeaSrc, content: "바다" },
				{ url: SeaSrc, content: "바다" },
				{ url: SeaSrc, content: "바다" },
			],
		},
		{
			질문번호: "2",
			질문: "질문2",
			답변: [
				{ url: SeaSrc, content: "바다" },
				{ url: SeaSrc, content: "바다" },
				{ url: SeaSrc, content: "바다" },
				{ url: SeaSrc, content: "바다" },
				{ url: SeaSrc, content: "바다" },
				{ url: SeaSrc, content: "바다" },
				{ url: SeaSrc, content: "바다" },
				{ url: SeaSrc, content: "바다" },
			],
		},
		{
			질문번호: "3",
			질문: "질문3",
			답변: [
				{ url: SeaSrc, content: "바다" },
				{ url: SeaSrc, content: "바다" },
			],
		},
		{ 질문번호: "4", 질문: "질문4", 답변: [{ url: SeaSrc, content: "바다" }] },
		{ 질문번호: "5", 질문: "질문5", 답변: [{ url: SeaSrc, content: "바다" }] },
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
	min-height: 80vh;
	font-size: 1.5rem;
	display: flex;
	flex-direction: column;
`;

export default Survey;
