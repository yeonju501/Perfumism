import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import React from "react";

interface Props {
	img: IconProp;
	handleClick?: React.MouseEventHandler;
}

function IconStyled(Props: Props) {
	return <FontAwesome icon={Props.img} onClick={Props.handleClick}></FontAwesome>;
}

export default IconStyled;

const FontAwesome = styled(FontAwesomeIcon)`
	width: 1.8rem;
	height: 1.8rem;
	margin-left: 2rem;
	cursor: pointer;
	@media ${(props) => props.theme.tabletS} {
		margin: 0;
	}
`;
