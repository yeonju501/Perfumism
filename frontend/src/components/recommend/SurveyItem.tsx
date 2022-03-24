import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import recommendApi from "apis/recommend";
import styled from "styled-components";

interface SurveyItemProps {
	queryString: string;
	surveyListItem: { 질문번호: string; 질문: string; 답변: string[] };
}

function SurveyItem({ queryString, surveyListItem }: SurveyItemProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
	const [answer, setAnswer] = useState("");
	const [recommendData, setRecommendData] = useState({});

	const getNextUrl = () => {
		const nextPage = Number(surveyListItem["질문번호"]) + 1;
		const newUrl =
			queryString.replace(surveyListItem["질문번호"], String(nextPage)) +
			"&a" +
			surveyListItem["질문번호"] +
			"=";
		return newUrl;
	};

	const nextUrl = getNextUrl() + answer;
	const nextPage = () => {
		if (surveyListItem["질문번호"] === "5") {
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
		<Container>
			<Title>{surveyListItem["질문"]}</Title>
			{surveyListItem["답변"].map((answer: string, idx: number) => (
				<label key={idx}>
					<input type="radio" name="answer" value={idx} onChange={answerHandleChange} />
					{answer}
				</label>
			))}
			<button onClick={nextPage}>다음페이지</button>
		</Container>
	);
}

const Container = styled.div`
	height: 80vh;
`;

const Title = styled.h1`
	color: #000;
	font-size: 4rem;
	font-weight: 800;
	text-align: center;
	margin: 5% auto 2%;
`;

export default SurveyItem;
