import Textarea from "components/review/Textarea";
import styled from "styled-components";

function Comment() {
	return (
		<Container>
			<Textarea></Textarea>
			<div>댓글 1</div>
			<div>댓글 2</div>
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
