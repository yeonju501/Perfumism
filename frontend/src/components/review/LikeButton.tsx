import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heart } from "@fortawesome/free-solid-svg-icons";
import useLikeButton from "../button/hooks/useLikeButton";

interface LikeButtonProps {
	reviewId: number;
}

function LikeButton({ reviewId }: LikeButtonProps) {
	const type = "perfume";
	const { isLiked, handleHeartClick } = useLikeButton({ type, typeId: reviewId });

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
