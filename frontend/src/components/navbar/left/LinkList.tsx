import styled from "styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import MenuLinks from "./MenuLinks";

interface HeaderProps {
	scrollheader: number;
}

interface IsToggle {
	isToggle: boolean;
	scrollheader?: number;
}
function LinkList({ scrollheader }: HeaderProps) {
	const [isToggle, setIsToggle] = useState(false);

	return (
		<>
			<CloseButton icon={faX} isToggle={!isToggle} onClick={() => setIsToggle(!isToggle)} />
			<MenuLinks scrollheader={scrollheader} isMenu={isToggle} />
			<MenuBars
				scrollheader={scrollheader}
				isToggle={isToggle}
				icon={faBars}
				onClick={() => setIsToggle(!isToggle)}
			/>
		</>
	);
}

export default LinkList;

const MenuBars = styled(FontAwesomeIcon)<IsToggle>`
	font-size: 2rem;
	display: none;
	color: ${(props) => (props.isToggle ? "#fff" : "#000")};
	@media ${(props) => props.theme.mobile} {
		display: ${(props) => (props.isToggle ? "none" : "block")};
		color: ${({ scrollheader }) => ((scrollheader as number) > 2 ? "#fff" : "#000")};
	}
`;

const CloseButton = styled(FontAwesomeIcon)<IsToggle>`
	font-size: 2rem;
	display: none;
	z-index: 3;
	color: #fff;
	position: absolute;
	top: 2rem;
	left: 22rem;
	@media ${(props) => props.theme.mobile} {
		display: ${(props) => (props.isToggle ? "none" : "block")};
	}
`;
