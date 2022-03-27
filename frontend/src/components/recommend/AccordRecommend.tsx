import styled from "styled-components";

interface AccordProps {
	accords: string[];
}

function AccordRecommend({ accords }: AccordProps) {
	return (
		<Container>
			<p>당신의 향기 취향은</p>
			<h3>
				{accords[0]}, {accords[1]}, {accords[2]}
			</h3>
			<p>이군요.</p>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 3rem;
`;

export default AccordRecommend;
