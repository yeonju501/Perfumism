import styled from "styled-components";

interface Props {
	url: string;
}

function WordCloud({ url }: Props) {
	const imageUrl = process.env.REACT_APP_WORDCLOUD_URL + url;

	return (
		<Container>
			<WordCloudImg src={imageUrl} />
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
	@media ${(props) => props.theme.mobileS} {
		width: 100%;
	}
`;

const WordCloudImg = styled.img`
	margin: 2rem 0;
	background-color: none;
	border: none;
`;

export default WordCloud;
