import communityApi from "apis/community";
import { CreateButton } from "components/button/Button";
import useReviewForm from "components/review/hooks/useCreateForm";
import Textarea from "components/review/Textarea";
import styled from "styled-components";
import { Review } from "types/review";

interface Props {
	articleId: number;
	commentId: number;
	commentIdx: number;
	setReply: React.Dispatch<React.SetStateAction<number>>;
	setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

function ReplyForm({ articleId, commentId, commentIdx, setReply, setReviews }: Props) {
	const { handleInputChange, handleFormSubmit, content } = useReviewForm({
		onSubmit: async () => {
			if (content.trim()) {
				await communityApi.createReply(articleId, commentId, { content });
				setReply(-1);
				const res = await communityApi.getUpdatedComment(articleId, commentIdx);
				setReviews((reviews) =>
					reviews.map((review) => {
						if (review.comment_id === commentId) {
							review.replyList = res.data.commentList[0].replyList;
						}
						return review;
					}),
				);
			} else {
				alert("대댓글 내용을 입력해주세요");
			}
		},
	});

	return (
		<FormContainer onSubmit={handleFormSubmit}>
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
