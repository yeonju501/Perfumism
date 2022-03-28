import styled from "styled-components";

interface PharseProps {
	title: string;
	content: string;
}

function Phrases({ title, content }: PharseProps) {
	return (
		<>
			<Title>{title}</Title>
			<Content>{content}</Content>
		</>
	);
}

export default Phrases;

const Title = styled.h1`
	color: #000;
	font-size: 4rem;
	font-weight: 800;
	text-align: center;
	margin: 0;
	@media ${(props) => props.theme.mobile} {
		font-size: 3rem;
	}
`;

const Content = styled.p`
	color: #000;
	font-size: 3rem;
	text-align: center;
	margin: 1rem 0 5rem;
	@media ${(props) => props.theme.mobile} {
		font-size: 2rem;
	}
`;
