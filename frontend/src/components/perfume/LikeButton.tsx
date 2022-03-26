import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heart } from "@fortawesome/free-solid-svg-icons";
import useLikeButton from "../button/hooks/useLikeButton";

interface LikeButtonProps {
	perfumeId: string;
	center?: boolean;
}

function LikeButton({ center, perfumeId }: LikeButtonProps) {
	const type = "perfume";
	const { isLiked, handleHeartClick } = useLikeButton({ type, typeId: perfumeId });

	return (
		<Button center={center} isLiked={isLiked} onClick={handleHeartClick}>
			<FontAwesomeIcon icon={heart} />
		</Button>
	);
}

interface ButtonProps {
	isLiked?: boolean;
	center?: boolean;
}

const Button = styled.button<ButtonProps>`
	color: ${({ isLiked }) => (isLiked ? "red" : "gray")};
	font-size: 2rem;
	background-color: inherit;
	border: none;
	cursor: pointer;
	position: ${({ center }) => (center ? "absolute" : "static")};
	top: 50%;
	left: 50%;
	transform: ${({ center }) => (center ? "translate(-50%, -100%)" : "0")};
	display: none;
`;

export default LikeButton;
