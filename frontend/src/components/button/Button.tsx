import styled from "styled-components";

export const CreateButton = styled.button`
	color: black;
	background-color: #f1f1f1;
	border: none;
	cursor: pointer;
	height: 3rem;
	width: 6rem;
`;

interface ShowMoreButtonProps {
	isLastPage: boolean;
}

export const ShowMoreButton = styled.button<ShowMoreButtonProps>`
	color: black;
	margin: 0 auto;
	background-color: #ededed;
	border: none;
	padding: 0.5rem 1rem;
	cursor: pointer;
	display: ${({ isLastPage }) => (isLastPage ? "none" : "block")};
`;

export const UpdateButton = styled.button`
	color: black;
	background-color: inherit;
	border: none;
	cursor: pointer;
`;

export const DeleteButton = styled.button`
	color: black;
	background-color: inherit;
	border: none;
	cursor: pointer;
`;
