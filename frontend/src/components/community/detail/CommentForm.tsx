import { CreateButton } from "components/button/Button";
import Textarea from "components/review/Textarea";
import styled from "styled-components";

function CommentForm() {
	return (
		<FormContainer>
			<Textarea placeholder="댓글을 입력하세요"></Textarea>
			<CreateButton>작성</CreateButton>
		</FormContainer>
	);
}

const FormContainer = styled.div`
	display: flex;
`;

export default CommentForm;
