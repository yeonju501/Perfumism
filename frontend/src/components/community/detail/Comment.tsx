import { useState } from "react";
import styled from "styled-components";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

interface CommentProps {
	articleId: number;
}

function Comment({ articleId }: CommentProps) {
	const [updateComments, setUpdateComments] = useState(false);

	return (
		<Container>
			<CommentForm articleId={articleId} setUpdateComments={setUpdateComments} />
			<CommentList articleId={articleId} updateComments={updateComments} />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	min-height: 20vh;
`;

export default Comment;
