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
	dispay: ${({ isLastPage }) => (isLastPage ? "none" : "inline-block")}
	color: ;
`;
