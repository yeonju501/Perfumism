import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import perfumeApi from "apis/perfume";

interface LikeButtonProps {
	perfumeId: string;
	center?: boolean;
}

function LikeButton({ center, perfumeId }: LikeButtonProps) {
	const [isLiked, setIsLiked] = useState(false);

	useEffect(() => {
		// isPerfumeLiked();
	}, []);

	const isPerfumeLiked = async () => {
		await perfumeApi.isPerfumeLiked(perfumeId).then((res) => setIsLiked(res.data.is_liked));
	};

	const handleHeartClick = async () => {
		isLiked
			? await perfumeApi.deleteFavoritePerfume(perfumeId)
			: await perfumeApi.addFavoritePerfume(perfumeId);
	};

	return (
		<Button center isLiked={isLiked} onClick={handleHeartClick}>
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
	transform: translate(-50%, -100%);
	display: none;
`;

export default LikeButton;
