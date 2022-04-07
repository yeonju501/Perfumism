import styled from "styled-components";

interface TagButtonProps {
	handleCategoryClick: (idx: number, e: React.MouseEvent<HTMLButtonElement>) => void;
	category: string;
	idx: number;
	clicked: number;
}

function TagButton({ handleCategoryClick, category, idx, clicked }: TagButtonProps) {
	return (
		<Button onClick={(e) => handleCategoryClick(idx, e)} idx={idx} clicked={clicked}>
			{category}
		</Button>
	);
}

interface ButtonProps {
	idx: number;
	clicked: number;
}

const Button = styled.button<ButtonProps>`
	background-color: ${(props) => (props.idx === props.clicked ? "#292929" : "#f1f1f1")};
	margin-right: 2rem;
	color: ${(props) => (props.idx === props.clicked ? "white" : "#292929")};
	border: 0.1rem solid #cfcfcf;
	font-size: 1.4rem;
	padding: 0.7rem 1.2rem;
	border-radius: 1.5rem;
	cursor: pointer;
	&:hover {
		background-color: #292929;
		color: white;
	}
	&:active {
	}
`;

export default TagButton;
