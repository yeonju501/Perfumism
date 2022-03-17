import { useSearchParams, useLocation } from "react-router-dom";
import SurveyItem from "components/SurveyItem";

function SurveyPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get("page");
	const queryString = useLocation().search;

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

export default SurveyPage;
