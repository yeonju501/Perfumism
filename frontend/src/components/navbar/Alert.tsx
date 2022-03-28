import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import styled from "styled-components";
import AlertBox from "./AlertBox";
import IconStyled from "./IconStyled";

function Alert() {
	const [isOn, setIsOn] = useState(false);

	return (
		<Container>
			<IconStyled img={faBell} handleClick={() => setIsOn(!isOn)} />
			<NumberOfNotification></NumberOfNotification>
			{isOn ? <AlertBox /> : undefined}
		</Container>
	);
}

export default Alert;

const Container = styled.div`
	margin-top: 0.3rem;
	position: relative;
`;

const NumberOfNotification = styled.span`
	width: 2rem;
	height: 2rem;
	border-radius: 50%;
	text-align: center;
	font-size: 1.2rem;
	font-weight: 600;
	background-color: red;
	color: #fff;
	position: absolute;
	top: -1.2rem;
	right: -1rem;
`;
