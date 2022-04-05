import { CreateButton } from "components/button/Button";
import { FormContainer } from "components/review/Container";
import Textarea from "components/review/Textarea";

function ReplyForm() {
	return (
		<FormContainer onSubmit={handleSubmitReview}>
			<Textarea
				placeholder="답글을 입력하세요"
				value={content}
				onChange={handleInputChange}
			></Textarea>
			<CreateButton>작성</CreateButton>
		</FormContainer>
	);
}

export default ReplyForm;
