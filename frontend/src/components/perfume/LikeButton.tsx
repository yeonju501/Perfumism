import styled from "styled-components";

interface LikeButtonProps {
	isLiked?: boolean;
}

const LikeButton = styled.button<LikeButtonProps>`
	color: ${({ isLiked }) => (isLiked ? "red" : "gray")};
	background-color: inherit;
	border: none;
	cursor: pointer;
	&:hover {
	}
`;

export default LikeButton;
