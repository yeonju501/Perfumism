import { useSearchParams, useLocation } from "react-router-dom";
import SurveyItem from "components/recommend/SurveyItem";
interface queryProps {
	queryString: string;
}

function Survey() {
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get("page");
	const queryString = useLocation().search;
	const surveyList = [
		{ "질문 1": ["a1", "a2", "a3", "a4"] },
		{ "질문 2": ["a1", "a2", "a3", "a4"] },
		{ "질문 3": ["a1", "a2", "a3", "a4"] },
		{ "질문 4": ["a1", "a2", "a3", "a4"] },
		{ "질문 5": ["a1", "a2", "a3", "a4"] },
	];

	return (
		<div>
			{page === "1" ? <SurveyItem queryString={queryString} /> : null}
			{page === "2" ? <SurveyItem queryString={queryString} /> : null}
			{page === "3" ? <SurveyItem queryString={queryString} /> : null}
			{page === "4" ? <SurveyItem queryString={queryString} /> : null}
			{page === "5" ? <SurveyItem queryString={queryString} /> : null}
		</div>
	);
}

export default Survey;
