import { useState, useRef } from "react";
import styled from "styled-components";
import useOutside from "components/navbar/hooks/useOutside";
import EngToKor from "./utils/EngToKor";

const options = ["ALL", "TALK", "CHOSE", "RECOMMEND"];

interface SubjectProps {
	setSubject?: React.Dispatch<React.SetStateAction<string>>;
	defaultSubject: string;
}

function Dropdown({ setSubject, defaultSubject }: SubjectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const Ref = useRef<HTMLFormElement>(null);

	useOutside({ Ref, setFunction: setIsOpen });

	const toggling = () => setIsOpen(!isOpen);

	const onOptionClicked = (value: string) => () => {
		if (setSubject) {
			setSubject(value);
		}
		setSelectedOption(value);
		setIsOpen(false);
	};

	return (
		<Main>
			<DropDownContainer ref={Ref}>
				<DropDownHeader onClick={toggling}>
					{EngToKor(selectedOption) || (defaultSubject && "전체")}
				</DropDownHeader>
				{isOpen && (
					<DropDownListContainer>
						<DropDownList>
							{options.map((option) => (
								<ListItem onClick={onOptionClicked(option)} key={Math.random()}>
									{EngToKor(option)}
								</ListItem>
							))}
						</DropDownList>
					</DropDownListContainer>
				)}
			</DropDownContainer>
		</Main>
	);
}

const Main = styled.div``;

const DropDownContainer = styled.form`
	width: 10em;
	margin: 0 auto;
	margin-bottom: 1rem;
`;

const DropDownHeader = styled.div`
	text-align: center;
	padding: 0.4rem 1rem 0.4rem 1rem;
	border: 2px solid #e5e5e5;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
	font-weight: 500;
	font-size: 1.3rem;
	background: #ffffff;
	cursor: pointer;
`;

const DropDownListContainer = styled.div`
	position: absolute;
	width: 10rem;
`;

const DropDownList = styled.ul`
	text-align: center;
	padding: 0;
	margin: 0;
	background: #ffffff;
	border: 2px solid #e5e5e5;
	box-sizing: border-box;
	font-size: 1.3rem;
	font-weight: 500;
	cursor: pointer;
	&:first-child {
		padding-top: 0.8em;
	}
`;

const ListItem = styled.li`
	list-style: none;
	height: 2.5rem;
	&:hover {
		transition: 0.5s;
		background-color: #d3d3d3;
		color: #2f4f4f;
	}
`;

export default Dropdown;
