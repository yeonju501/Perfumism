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
			{isOn ? <AlertBox /> : undefined}
		</Container>
	);
}

export default Alert;

const Container = styled.div`
	margin-top: 0.3rem;
	position: relative;
`;
