import { useEffect, useState } from "react";
import styled from "styled-components";
import Spinner from "assets/spinner.gif";

function Loading() {
	const [recommendData, setRecommendData] = useState({});

	useEffect(() => {
		getRecommendData();
	}, []);

	const getRecommendData = async () => {
		console.log("ok");
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
