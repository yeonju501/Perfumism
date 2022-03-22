import styled from "styled-components";

interface LikeButtonProps {
	isLiked?: boolean;
	center?: boolean;
}

export const LikeButton = styled.button<LikeButtonProps>`
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

export const CreateButton = styled.button`
	color: black;
	background-color: #cecece;
	border: none;
	cursor: pointer;
`;

export const ShowMoreButton = styled.button`
	color: black;
	background-color: #dedede;
	border: none;
	cursor: pointer;
`;
