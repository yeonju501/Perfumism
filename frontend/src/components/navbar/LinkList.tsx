import styled from "styled-components";
import { Link } from "react-router-dom";

interface HeaderProps {
	scrollheader: number;
}
function LinkList({ scrollheader }: HeaderProps) {
	return (
		<ListItem>
			<LinkParagraph scrollheader={scrollheader} to="/recommend">
				RECOMMEND
			</LinkParagraph>
			<LinkParagraph scrollheader={scrollheader} to="/">
				PERFUMES
			</LinkParagraph>
			<LinkParagraph scrollheader={scrollheader} to="/">
				COMMUNITY
			</LinkParagraph>
		</ListItem>
	);
}

export default LinkList;

const ListItem = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const LinkParagraph = styled(Link)<HeaderProps>`
	text-decoration: none;
	font-size: 1.3rem;
	font-weight: 900;
	margin-right: 5rem;
	color: ${({ scrollheader }) => (scrollheader > 2 ? "#fff" : "#000")};
`;
