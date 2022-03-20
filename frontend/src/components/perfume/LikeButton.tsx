import styled from "styled-components";

interface LikeButtonProps {
	isLiked?: boolean;
}

const LikeButton = styled.button<LikeButtonProps>`
	color: ${({ isLiked }) => (isLiked ? "red" : "gray")};
	width: 5rem;
	background-color: none;
	border: none;
	height: 5rem;
	&:hover {
	}
`;

export default LikeButton;
