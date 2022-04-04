import styled from "styled-components";
import { useRef } from "react";
import useOutside from "../hooks/useOutside";

interface Props {
	scrollheader: number;
	isMenu?: boolean;
	setIsToggle?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface isMenu {
	isMenu?: boolean;
}

const handleClick = (link: string) => {
	location.replace(link);
};

function MenuLinks({ scrollheader, isMenu, setIsToggle }: Props) {
	const Ref = useRef<HTMLLIElement>(null);
	useOutside({ Ref, setFunction: setIsToggle as React.Dispatch<React.SetStateAction<boolean>> });

	return (
		<ListItem isMenu={isMenu} ref={Ref}>
			<LinkParagraph scrollheader={scrollheader} onClick={() => handleClick("/recommend")}>
				RECOMMEND
			</LinkParagraph>
			<LinkParagraph scrollheader={scrollheader} onClick={() => handleClick("/perfumes")}>
				PERFUMES
			</LinkParagraph>
			<LinkParagraph scrollheader={scrollheader} onClick={() => handleClick("/community")}>
				COMMUNITY
			</LinkParagraph>
		</ListItem>
	);
}

export default MenuLinks;

const ListItem = styled.li<isMenu>`
	display: flex;
	align-items: center;
	@media ${(props) => props.theme.mobile} {
		display: flex;
		transform: ${(props) => (props.isMenu ? "translateX(0)" : "translateX(-30rem)")};
		flex-direction: column;
		position: absolute;
		top: 0;
		left: 0;
		background: #000;
		width: 25rem;
		height: 100vh;
		justify-content: center;
		z-index: 1;
		transition: all 0.35s;
	}
`;

const LinkParagraph = styled.p<Props>`
	text-decoration: none;
	font-size: 1.5rem;
	font-weight: 900;
	margin-right: 3.5rem;
	cursor: pointer;
	color: ${({ scrollheader }) => (scrollheader > 2 ? "#fff" : "#000")};
	@media ${(props) => props.theme.tabletS} {
		margin-right: 1rem;
	}

	@media ${(props) => props.theme.mobile} {
		color: #fff;
		margin-bottom: 5rem;
		font-size: 2rem;
	}
`;
