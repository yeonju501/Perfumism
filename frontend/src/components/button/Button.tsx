import styled from "styled-components";

export const CreateButton = styled.button`
	color: black;
	background-color: #cecece;
	border: none;
	cursor: pointer;
`;

interface ShowMoreButtonProps {
	isLastPage: boolean;
}

export const ShowMoreButton = styled.button<ShowMoreButtonProps>`
	color: black;
	background-color: #dedede;
	border: none;
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
