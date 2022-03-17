import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SurveyItem: React.FC<{ queryString: string }> = (props) => {
	const navigate = useNavigate();
	const [answer, setAnswer] = useState("");

	const nextPage = () => {
		navigate({
			pathname: "/survey",
			search: props.queryString + "&a1=" + answer,
		});
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
};

export default SurveyItem;
