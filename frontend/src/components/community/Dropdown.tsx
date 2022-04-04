import { useState, useRef } from "react";
import styled from "styled-components";
import useOutside from "components/navbar/hooks/useOutside";

const options = ["ALL", "RECOMMEND", "CHOSE", "TALK"];

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
				<DropDownHeader onClick={toggling}>{selectedOption || defaultSubject}</DropDownHeader>
				{isOpen && (
					<DropDownListContainer>
						<DropDownList>
							{options.map((option) => (
								<ListItem onClick={onOptionClicked(option)} key={Math.random()}>
									{option}
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
	width: 8em;
	margin: 0 auto;
`;

const DropDownHeader = styled.div`
	text-align: center;
	margin-bottom: 0.8em;
	padding: 0.4em 1em 0.4em 1em;
	border: 2px solid #e5e5e5;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
	font-weight: 500;
	font-size: 1.3rem;
	background: #ffffff;
	cursor: pointer;
`;

const DropDownListContainer = styled.div`
	position: absolute;
	width: 8rem;
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
