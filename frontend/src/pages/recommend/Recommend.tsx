import { Button, RecommendButton } from "components/recommend";
import styled from "styled-components";

function Recommend() {
	return (
		<Container>
			<Title>Find your signature scent</Title>
			<RecommendButton
				firstSentence="누구나 자신만의 향기가 있습니다."
				secondSentence="간단한 설문을 통해 당신의 향기를 찾아보세요."
				url="/survey?page=1"
			/>
			<RecommendButton
				firstSentence="자신만의 향기가 있는 당신,"
				secondSentence="비슷한 향기를 찾아보세요."
				url="/survey?page=1"
			/>
		</Container>
	);
}

const Container = styled.div`
	height: 80vh;
	font-size: 1.5rem;
	display: flex;
	flex-direction: column;
	animation-name: appear;
	animation-duration: 2s;
	@keyframes appear {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
`;

const Title = styled.h1`
	color: #000;
	font-size: 4rem;
	font-weight: 800;
	text-align: center;
	margin: 5% auto 2%;
`;

export default Recommend;
