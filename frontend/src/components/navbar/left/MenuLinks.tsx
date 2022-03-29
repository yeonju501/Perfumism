import styled from "styled-components";

interface Props {
	scrollheader: number;
	isMenu?: boolean;
}

interface isMenu {
	isMenu?: boolean;
}

const handleClick = (link: string) => {
	location.replace(link);
};

function MenuLinks({ scrollheader, isMenu }: Props) {
	return (
		<ListItem isMenu={isMenu}>
			<LinkParagraph scrollheader={scrollheader} onClick={() => handleClick("/recommend")}>
				RECOMMEND
			</LinkParagraph>
			<LinkParagraph scrollheader={scrollheader} onClick={() => handleClick("/perfumes")}>
				PERFUMES
			</LinkParagraph>
			<LinkParagraph scrollheader={scrollheader} onClick={() => handleClick("/recommend")}>
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
		display: ${(props) => (props.isMenu ? "flex" : "none")};
		flex-direction: column;
		position: absolute;
		top: 0;
		left: 0;
		background: #000;
		width: 25rem;
		height: 100vh;
		justify-content: center;
		z-index: 2;
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
