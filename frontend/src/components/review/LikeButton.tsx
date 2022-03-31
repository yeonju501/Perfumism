import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heart } from "@fortawesome/free-solid-svg-icons";
import useLikeButton from "../button/hooks/useLikeButton";
import { reviewApi } from "apis";

interface LikeButtonProps {
	reviewId: number;
}

function LikeButton({ reviewId }: LikeButtonProps) {
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
		<Button isLiked={isLiked} onClick={handleHeartClick}>
			<FontAwesomeIcon icon={heart} />
		</Button>
	);
}

interface ButtonProps {
	isLiked?: boolean;
}

const Button = styled.button<ButtonProps>`
	color: ${({ isLiked }) => (isLiked ? "red" : "gray")};
	font-size: 1rem;
	background-color: inherit;
	border: none;
	cursor: pointer;
`;

export default LikeButton;
