import { DeleteButton, UpdateButton } from "components/button/Button";

interface Props {
	handleUpdateClick: (reviewId: number) => void;
	handleReplyDeleteClick: (reviewId: number, commentId: number) => Promise<void>;
	parentId: number;
	commentId: number;
}

function ReplyButtons({ handleUpdateClick, handleReplyDeleteClick, parentId, commentId }: Props) {
	return (
		<div>
			<UpdateButton onClick={() => handleUpdateClick(commentId)}>수정</UpdateButton>
			<DeleteButton onClick={() => handleReplyDeleteClick(parentId, commentId)}>삭제</DeleteButton>
		</div>
	);
}

export default ReplyButtons;
