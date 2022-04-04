import styled from "styled-components";
import CommentForm from "./CommentForm";

interface CommentProps {
	articleId: number;
}

function Comment({ articleId }: CommentProps) {
	return (
		<Container>
			<CommentForm articleId={articleId} />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	min-height: 20vh;
	border-style: inset;
`;

export default Comment;
