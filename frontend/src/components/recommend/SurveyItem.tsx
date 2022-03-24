import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import recommendApi from "apis/recommend";
import styled from "styled-components";
import { Answer } from "components/recommend";

interface SurveyItemProps {
	queryString: string;
	surveyListItem: { 질문번호: string; 질문: string; 답변: string[] };
}

function SurveyItem({ queryString, surveyListItem }: SurveyItemProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
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

	const nextPage = (strAnswer: string) => {
		const nextUrl = getNextUrl() + strAnswer;
		if (surveyListItem["질문번호"] === "5") {
			// getRecommendData();
			navigate("/survey/result");
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
			a5: searchParams.get("a5"),
		};
		return answerData;
	};

	const answerHandleChange = (answer: number) => {
		const strAnswer = String(answer);
		nextPage(strAnswer);
	};

	return (
		<Container>
			<Title>{surveyListItem["질문"]}</Title>
			<Section>
				{surveyListItem["답변"].map((answer: string, idx: number) => (
					<Answer key={idx} answerHandleChange={answerHandleChange} number={idx} />
				))}
			</Section>
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

const Section = styled.div`
	display: flex;
	justify-content: center;
`;

export default SurveyItem;
