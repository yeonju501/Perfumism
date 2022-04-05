import { CreateButton } from "components/button/Button";
import { FormContainer } from "components/review/Container";
import Textarea from "components/review/Textarea";

function CommentUpdate() {
	return (
		<FormContainer onSubmit={handleReviewUpdate}>
			<Textarea
				value={content}
				onChange={handleInputChange}
				placeholder="댓글을 수정하세요"
			></Textarea>
			<CreateButton>수정</CreateButton>
		</FormContainer>
	);
}

export default CommentUpdate;
