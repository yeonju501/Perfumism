import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import IconStyled from "./IconStyled";

function Alert() {
	const [isOn, setIsOn] = useState(false);

	return (
		<>
			<IconStyled img={faBell} handleClick={() => setIsOn(!isOn)} />
			{isOn ? <div>hi</div> : <div>bye</div>}
		</>
	);
}

export default Alert;
