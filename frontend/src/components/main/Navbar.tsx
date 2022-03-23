import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Search, Icons } from "./index";
import LinkList from "./LinkList";

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
					<LinkList scrollheader={scrollPosition} />
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

const Head = styled(Link)<HeaderProps>`
	font-size: 4rem;
	font-weight: 900;
	text-decoration: none;
	display: flex;
	justify-content: center;
	color: ${({ scrollheader }) => (scrollheader > 2 ? "#fff" : "#000")};
`;

export default Navbar;
