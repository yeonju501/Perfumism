import styled from "styled-components";

interface Perfume {
	content: string;
	created_at: Array<CreatedDate>;
	grade: number;
	member_id: number;
	member_image?: string;
	member_name: string;
	perfume_id: number;
	perfume_name: string;
	review_id: number;
}

interface CreatedDate {
	0: number;
	1: number;
	2: number;
	3: number;
}

interface Review {
	review: Perfume;
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
