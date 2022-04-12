import communityApi from "apis/community";
import { CreateButton } from "components/button/Button";
import { FormContainer } from "components/review/Container";
import useReviewForm from "components/review/hooks/useCreateForm";
import Textarea from "components/review/Textarea";
import { useEffect } from "react";
import styled from "styled-components";
import { Review } from "types/review";

interface Props {
	commentId: number;
	articleId: number;
	oldContent: string;
	parentId: number;
	setIsEditable: React.Dispatch<React.SetStateAction<number>>;
	setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

function ReplyUpdate({
	oldContent,
	commentId,
	articleId,
	parentId,
	setIsEditable,
	setReviews,
}: Props) {
	const { handleInputChange, handleFormSubmit, content, setContent } = useReviewForm({
		onSubmit: async () => {
			if (content.trim()) {
				await communityApi.updateComment(articleId, commentId, { content });
				setIsEditable(-1);
				setReviews((reviews) =>
					reviews.map((review) => {
						if (review.comment_id === parentId) {
							review.replyList.map((reply) => {
								if (reply.comment_id === commentId) reply.content = content;
							});
						}
						return review;
					}),
				);
			} else {
				alert("대댓글 내용을 입력해주세요");
			}
		},
	});

	useEffect(() => {
		setContent(oldContent);
	}, []);

	return (
		<FormContainer onSubmit={handleFormSubmit}>
			<Div>
				<Textarea
					value={content}
					onChange={handleInputChange}
					placeholder="댓글을 수정하세요"
				></Textarea>
				<CreateButton>수정</CreateButton>
			</Div>
		</FormContainer>
	);
}

const Div = styled.div`
	display: flex;
	align-items: center;
`;
export default ReplyUpdate;
