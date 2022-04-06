import communityApi from "apis/community";
import { CreateButton } from "components/button/Button";
import useReviewForm from "components/review/hooks/useReviewForm";
import Textarea from "components/review/Textarea";
import styled from "styled-components";

interface ReplyFormProps {
	articleId: number;
	commentId: number;
	commentIdx: number;
	setReply: React.Dispatch<React.SetStateAction<number>>;
	setReviews: React.Dispatch<React.SetStateAction<ReviewType[]>>;
}

interface ReviewType {
	comment_id: number;
	review_id: number;
	member_id: number;
	member_name: string;
	member_image: string;
	grade: number;
	content: string;
	likes: number;
	replyList: replyType[];
}

interface replyType {
	comment_id: number;
	member_id: number;
	member_name: string;
	article_id: number;
	parentId: number;
	content: string;
	created_at: string;
	updated_at: string;
	deleted_at: string;
	deletion: boolean;
}

function ReplyForm({ articleId, commentId, commentIdx, setReply, setReviews }: ReplyFormProps) {
	const { handleInputChange, handleFormSubmit, content } = useReviewForm({
		sendReviewData: () => {
			return communityApi.createReply(articleId, commentId, { content });
		},
	});

	const handleSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
		await handleFormSubmit(e);
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
