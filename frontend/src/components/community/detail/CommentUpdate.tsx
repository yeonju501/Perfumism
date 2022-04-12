import communityApi from "apis/community";
import { CreateButton } from "components/button/Button";
import { FormContainer } from "components/review/Container";
import useReviewForm from "components/review/hooks/useCreateForm";
import Textarea from "components/review/Textarea";
import { useEffect } from "react";
import styled from "styled-components";
import { Review } from "types/review";

interface ReviewUpdateProp {
	commentId: number;
	articleId: number;
	oldContent: string;
	setIsEditable: React.Dispatch<React.SetStateAction<number>>;
	setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

function CommentUpdate({
	oldContent,
	commentId,
	articleId,
	setIsEditable,
	setReviews,
}: ReviewUpdateProp) {
	const { handleInputChange, handleFormSubmit, content, setContent } = useReviewForm({
		onSubmit: async () => {
			if (content.trim()) {
				await communityApi.updateComment(articleId, commentId, { content });
				setIsEditable(-1);
				setReviews((reviews) =>
					reviews.map((review) => {
						if (review.comment_id === commentId) {
							review.content = content;
						}
						return review;
					}),
				);
			} else {
				alert("댓글 내용을 입력해주세요");
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

export default CommentUpdate;
