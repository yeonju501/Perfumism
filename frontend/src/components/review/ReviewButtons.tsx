import { DeleteButton, UpdateButton } from "components/button/Button";

interface ReviewButtonsProps {
	handleUpdateClick: (reviewId: number) => void;
	handleDeleteClick: (reviewId: number) => Promise<void>;
	reviewId: number;
}

function ReviewButtons({ handleUpdateClick, handleDeleteClick, reviewId }: ReviewButtonsProps) {
	return (
		<div>
			<UpdateButton onClick={() => handleUpdateClick(reviewId)}>수정</UpdateButton>
			<DeleteButton onClick={() => handleDeleteClick(reviewId)}>삭제</DeleteButton>
		</div>
	);
}

export default ReviewButtons;
