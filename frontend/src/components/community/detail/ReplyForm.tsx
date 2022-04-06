import communityApi from "apis/community";
import { CreateButton } from "components/button/Button";
import useReviewForm from "components/review/hooks/useReviewForm";
import Textarea from "components/review/Textarea";
import styled from "styled-components";

interface ReplyFormProps {
	articleId: number;
	commentId: number;
	setReply: React.Dispatch<React.SetStateAction<number>>;
}

function ReplyForm({ articleId, commentId, setReply }: ReplyFormProps) {
	const { handleInputChange, handleFormSubmit, content } = useReviewForm({
		sendReviewData: () => {
			return communityApi.createReply(articleId, commentId, { content });
		},
	});

	const handleSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
		await handleFormSubmit(e);
		setReply(-1);
	};

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

export const FormContainer = styled.form`
	margin: 3rem 0;
	padding: 1rem;
	border: 0.3px solid #dedede;
	width: 95%;
	margin-left: auto;
	display: flex;
	align-items: center;
`;

export default ReplyForm;
