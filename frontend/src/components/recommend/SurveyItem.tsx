import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import recommendApi from "apis/recommend";

interface SurveyItemProps {
	queryString: string;
	surveyListItem: { 질문: string; 답변: string[] };
}

function SurveyItem({ queryString, surveyListItem }: SurveyItemProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
	const [answer, setAnswer] = useState("");
	const [recommendData, setRecommendData] = useState({});

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

	const getRecommendData = async () => {
		const answerData = getAnswerData();
		try {
			await recommendApi.createSurveyRecommend(answerData).then((res) => {
				setRecommendData(res.data);
				navigate("/survey/result");
			});
		} catch (error) {
			console.log(error);
		}
	};

	const getAnswerData = () => {
		const answerData = {
			a1: searchParams.get("a1"),
			a2: searchParams.get("a2"),
			a3: searchParams.get("a3"),
			a4: searchParams.get("a4"),
			a5: answer,
		};
		return answerData;
	};

	const answerHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAnswer(e.target.value);
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
