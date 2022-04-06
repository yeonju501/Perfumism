import { DeleteButton, UpdateButton } from "components/button/Button";

interface CommentButtonsProps {
	handleUpdateClick: (reviewId: number) => void;
	handleCommentDeleteClick: (reviewId: number, replyCount: number) => Promise<void>;
	reviewId: number;
	replyCount: number;
}

function CommentButtons({
	handleUpdateClick,
	handleCommentDeleteClick,
	reviewId,
	replyCount,
}: CommentButtonsProps) {
	return (
		<div>
			<UpdateButton onClick={() => handleUpdateClick(reviewId)}>수정</UpdateButton>
			<DeleteButton onClick={() => handleCommentDeleteClick(reviewId, replyCount)}>
				삭제
			</DeleteButton>
		</div>
	);
}

export default CommentButtons;
