import { useState } from "react";
import PlusSrc from "assets/plus.png";
import styled from "styled-components";

interface ImgProps {
	setSelectedImg?: React.Dispatch<React.SetStateAction<string>>;
}

function PlusButton({ setSelectedImg }: ImgProps) {
	const [isOpen, setIsOpen] = useState(false);

	const toggling = () => setIsOpen(!isOpen);

	return (
		<Container>
			{isOpen && (
				<div>
					<input type="file" multiple />
				</div>
			)}
			<ButtonImg src={PlusSrc} alt="" onClick={toggling} />
		</Container>
	);
}

const Container = styled.div`
	position: absolute;
	bottom: 5rem;
	right: 5rem;
	cursor: pointer;
`;

const ButtonImg = styled.img`
	width: 12rem;
`;

export default PlusButton;
