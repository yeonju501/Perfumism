import styled from "styled-components";

function WordCloud() {
	return (
		<Container>
			<h1>wordCloud</h1>
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
