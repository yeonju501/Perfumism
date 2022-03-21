import styled from "styled-components";

interface LikeButtonProps {
	isLiked?: boolean;
}

export const LikeButton = styled.button<LikeButtonProps>`
	color: ${({ isLiked }) => (isLiked ? "red" : "gray")};
	background-color: inherit;
	border: none;
	cursor: pointer;
	&:hover {
	}
`;

export const CreateButton = styled.button`
	color: black;
	background-color: #cecece;
	border: none;
	cursor: pointer;
`;
