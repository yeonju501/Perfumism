import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heart } from "@fortawesome/free-solid-svg-icons";
import useLikeButton from "../button/hooks/useLikeButton";
import { reviewApi } from "apis";

interface LikeButtonProps {
	reviewId: number;
	changeReviewLikes: (reviewId: number) => Promise<void>;
}

function LikeButton({ reviewId, changeReviewLikes }: LikeButtonProps) {
	const { isLiked, handleHeartClick } = useLikeButton({
		getIsLiked: () => {
			return reviewApi.isReviewLiked(reviewId);
		},
		addLike: () => {
			return reviewApi.addReviewLike(reviewId);
		},
		cancelLike: () => {
			return reviewApi.cancelReviewLike(reviewId);
		},
	});

	return (
		<Button
			isLiked={isLiked}
			onClick={async () => {
				await handleHeartClick();
				changeReviewLikes(reviewId);
			}}
			reviewId={reviewId}
		>
			<FontAwesomeIcon icon={heart} />
		</Button>
	);
}

interface ButtonProps {
	isLiked?: boolean;
	reviewId?: number;
}

const Button = styled.button<ButtonProps>`
	color: ${({ isLiked }) => (isLiked ? "red" : "gray")};
	font-size: ${({ reviewId }) => (reviewId ? "2rem" : "1rem")};
	background-color: inherit;
	border: none;
	cursor: pointer;
`;

export default LikeButton;
