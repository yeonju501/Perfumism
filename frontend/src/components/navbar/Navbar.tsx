import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Icons, LinkList } from "./index";

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
					<Icons />
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
	position: sticky;
	top: 0;
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
	@media ${(props) => props.theme.tabletS} {
		margin: 0 2%;
	}
`;

const Ul = styled.ul`
	display: flex;
`;

const Head = styled(Link)<HeaderProps>`
	font-size: 4rem;
	font-weight: 900;
	text-decoration: none;
	display: flex;
	justify-content: center;
	color: ${({ scrollheader }) => (scrollheader > 2 ? "#fff" : "#000")};
	@media ${(props) => props.theme.tabletS} {
		font-size: 3rem;
	}
`;

export default Navbar;
