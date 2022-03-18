import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SurveyItemProps {
	queryString: string;
	surveyListItem: { 질문: string; 답변: string[] };
}

function SurveyItem({ queryString, surveyListItem }: SurveyItemProps) {
	const navigate = useNavigate();
	const [answer, setAnswer] = useState("");

	const nowPage = queryString.slice(6, 7);
	const getNextUrl = () => {
		const nextPage = Number(nowPage) + 1;
		const newUrl = queryString.replace(nowPage, String(nextPage)) + "&a" + nowPage + "=";
		return newUrl;
	};

	const nextUrl = getNextUrl() + answer;
	const nextPage = () => {
		if (nowPage === "5") {
			getRecommendData();
		} else {
			navigate({
				pathname: "/survey",
				search: nextUrl,
			});
		}
	};

	const answerHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAnswer(e.target.value);
	};

	const getRecommendData = () => {
		console.log("데이터 요청");
		navigate("/survey/result");
	};

	return (
		<div>
			<h1>{surveyListItem["질문"]}</h1>
			{surveyListItem["답변"].map((answer: string, idx: number) => (
				<label key={idx}>
					<input type="radio" name="answer" value={idx} onChange={answerHandleChange} />
					{answer}
				</label>
			))}
			<button onClick={nextPage}>다음페이지</button>
		</div>
	);
}

export default SurveyItem;
