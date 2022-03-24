import styled from "styled-components";
import { Button } from "./index";

interface RecommendButtonProps {
	firstSentence: string;
	secondSentence?: string;
	url: string;
}

function RecommendButton({ firstSentence, secondSentence, url }: RecommendButtonProps) {
	return (
		<>
			<Button to={url}>
				<Sentence>{firstSentence}</Sentence>
				<Sentence>{secondSentence}</Sentence>
			</Button>
		</>
	);
}

const Sentence = styled.p`
	font-size: 2.5rem;
`;

export default RecommendButton;
