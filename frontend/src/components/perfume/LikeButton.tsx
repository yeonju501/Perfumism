import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heart } from "@fortawesome/free-solid-svg-icons";
import useLikeButton from "../button/hooks/useLikeButton";
import perfumeApi from "apis/perfume";

interface LikeButtonProps {
	perfumeId: string;
	center?: boolean;
}

function LikeButton({ center, perfumeId }: LikeButtonProps) {
	const { isLiked, handleHeartClick } = useLikeButton({
		getIsLiked: () => {
			return perfumeApi.isPerfumeLiked(perfumeId);
		},
		addLike: () => {
			return perfumeApi.addFavoritePerfume(perfumeId);
		},
		cancelLike: () => {
			return perfumeApi.deleteFavoritePerfume(perfumeId);
		},
	});

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
	position: absolute;
	top: ${({ center }) => (center ? "50%" : "90%")};
	left: ${({ center }) => (center ? "50%" : "90%")};
	transform: ${({ center }) => (center ? "translate(-50%, -100%)" : "0")};
	display: none;
`;

export default LikeButton;
