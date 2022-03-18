import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SurveyItem({ queryString }: any) {
	const navigate = useNavigate();
	const [answer, setAnswer] = useState("");

	const nextPage = () => {
		const nextUrl = getNextUrl();
		navigate({
			pathname: "/survey",
			search: nextUrl + answer,
		});
	};

	const getNextUrl = () => {
		const nowPage = queryString.slice(6, 7);
		const nextPage = Number(queryString.slice(6, 7)) + 1;
		const newUrl = queryString.replace(nowPage, String(nextPage)) + "&a" + nowPage + "=";
		console.log(newUrl);
		return newUrl;
	};

	const answerHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAnswer(e.target.value);
	};

	return (
		<div>
			<h1>질문</h1>
			<label>
				<input type="radio" name="answer" value="1" onChange={answerHandleChange} />
				1번
			</label>
			<label>
				<input type="radio" name="answer" value="2" onChange={answerHandleChange} />
				2번
			</label>
			<label>
				<input type="radio" name="answer" value="3" onChange={answerHandleChange} />
				3번
			</label>
			<label>
				<input type="radio" name="answer" value="4" onChange={answerHandleChange} />
				4번
			</label>
			<button onClick={nextPage}>다음페이지</button>
		</div>
	);
}

export default SurveyItem;
