import { useNavigate, useSearchParams } from "react-router-dom";
import SurveyItem from "components/SurveyItem";

function SurveyPage() {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get("page");

	return (
		<div>
			{page === "1" ? <SurveyItem /> : null}
			{page === "2" ? <SurveyItem /> : null}
			{page === "3" ? <SurveyItem /> : null}
			{page === "4" ? <SurveyItem /> : null}
			{page === "5" ? <SurveyItem /> : null}
		</div>
	);
}

export default SurveyPage;
