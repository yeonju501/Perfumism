import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Spinner from "assets/spinner.gif";

function Loading() {
	const [recommendData, setRecommendData] = useState({});
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		getRecommendData();
	}, []);

	const getRecommendData = async () => {
		console.log("ok");
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

	return (
		<Container>
			<LoadingImg src={Spinner} />
			<h1>잠시만 기다려 주세요.</h1>
		</Container>
	);
}

const Container = styled.div`
	min-height: 80vh;
	font-size: 1.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const LoadingImg = styled.img`
	width: 50rem;
	height: 50rem;
`;

export default Loading;
