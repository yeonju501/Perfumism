import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
	img: IconProp;
}

function IconStyled(Props: Props) {
	return <FontAwesome icon={Props.img}></FontAwesome>;
}

export default IconStyled;

const FontAwesome = styled(FontAwesomeIcon)`
	width: 1.8rem;
	height: 1.8rem;
	margin-left: 2rem;
	cursor: pointer;
`;
