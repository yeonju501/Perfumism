import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Search, Icons } from "./index";

interface NavProps {
	justifyContent?: string;
}

interface HeaderProps {
	scrollheader: number;
}

function Navbar() {
	const [scrollPosition, setScrollPosition] = useState(0);
	const updateScroll = () => {
		setScrollPosition(window.scrollY || document.documentElement.scrollTop);
	};

	useEffect(() => {
		window.addEventListener("scroll", updateScroll);
	});

	return (
		<Header scrollheader={scrollPosition}>
			<Nav>
				<Ul>
					<ListItem>
						<LinkParagraph scrollheader={scrollPosition} to="/recommend">
							RECOMMEND
						</LinkParagraph>
						<LinkParagraph scrollheader={scrollPosition} to="/">
							PERFUMES
						</LinkParagraph>
						<LinkParagraph scrollheader={scrollPosition} to="/">
							COMMUNITY
						</LinkParagraph>
					</ListItem>
				</Ul>
			</Nav>
			<Head scrollheader={scrollPosition} to="/">
				PERFUMISM
			</Head>
			<Nav justifyContent="flex-end">
				<Ul>
					<ListItem>
						<Search />
						<Icons />
					</ListItem>
				</Ul>
			</Nav>
		</Header>
	);
}

const Header = styled.header<HeaderProps>`
	background: ${({ scrollheader }) => (scrollheader > 2 ? "#000" : "#fff")};
	color: ${({ scrollheader }) => (scrollheader > 2 ? "#fff" : "#000")};
	width: 100%;
	height: 10rem;
	position: fixed;
	z-index: 20;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid black;
`;

const Nav = styled.nav<NavProps>`
	display: flex;
	justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : "flex-start")};
	width: 20%;
	margin: 0 5%;
`;

const Ul = styled.ul`
	display: flex;
`;

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

const Head = styled(Link)<HeaderProps>`
	font-size: 4rem;
	font-weight: 900;
	text-decoration: none;
	display: flex;
	justify-content: center;
	color: ${({ scrollheader }) => (scrollheader > 2 ? "#fff" : "#000")};
`;

export default Navbar;
