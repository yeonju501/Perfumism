import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SurveyItem() {
	const navigate = useNavigate();

	const nextPage = () => {
		navigate({
			pathname: "/survey",
			search: "?page=2&a1=1",
		});
	};

	return (
		<div>
			<h1>질문</h1>
			<button onClick={nextPage}>다음페이지</button>
		</div>
	);
}

export default SurveyItem;
