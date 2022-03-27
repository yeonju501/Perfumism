import styled from "styled-components";
import test from "assets/test.jpg";

function WordCloud() {
	return (
		<Container>
			<img src={test} />
		</Container>
	);
}

const Container = styled.div`
	min-height: 30vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-top-style: ridge;
	border-bottom-style: ridge;
	width: 50rem;
`;

export default WordCloud;
