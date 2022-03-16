import { useNavigate } from "react-router-dom";

function FirstSurveyPage() {
	const navigate = useNavigate();

	return (
		<div>
			<h1>첫 번째 항목</h1>
			<button
				onClick={() => {
					navigate({
						pathname: "/survey",
						search: "?page=2&a1=1",
					});
				}}
			>
				다음페이지
			</button>
			<h1>두 번째 항목</h1>
			<button
				onClick={() => {
					navigate({
						pathname: "/survey",
						search: "?page=3&a1=1&a2=3",
					});
				}}
			>
				다음페이지
			</button>
		</div>
	);
}

export default FirstSurveyPage;
