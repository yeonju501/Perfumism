import PlusSrc from "assets/plus.png";
import styled from "styled-components";

function PlusButton() {
	return (
		<Container>
			<img src={PlusSrc} alt="" />
		</Container>
	);
}

const Container = styled.div`
	position: absolute;
	bottom: 0;
	right: 0;
	cursor: pointer;
`;

export default PlusButton;
