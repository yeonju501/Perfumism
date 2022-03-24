import styled from "styled-components";

interface Perfume {
	content: string;
	grade: number;
	member_id: number;
	member_image?: string;
	perfume_id: number;
	review_id: number;
}

interface temp {
	perfume: string;
}

function ReviewText({ perfume }: temp) {
	return (
		<Container>
			<PerfumeName></PerfumeName>
			<Content></Content>
			<DateAndName></DateAndName>
		</Container>
	);
}

export default ReviewText;

const Container = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const PerfumeName = styled.p`
	font-size: 2rem;
	font-weight: 800;
`;

const Content = styled.p`
	font-size: 2rem;
`;

const DateAndName = styled.p``;
