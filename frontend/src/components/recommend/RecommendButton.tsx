import { Button } from "./index";
import styled from "styled-components";

interface RecommendButtonProps {
	firstSentence: string;
	secondSentence: string;
	url: string;
}

function RecommendButton({ firstSentence, secondSentence, url }: RecommendButtonProps) {
	return (
		<>
			<Button to={url}>
				누구나 자신만의 향기가 있습니다. 간단한 설문을 통해 당신의 향기를 찾아보세요.
			</Button>
		</>
	);
}

export default RecommendButton;
