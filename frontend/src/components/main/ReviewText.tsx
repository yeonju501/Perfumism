import styled from "styled-components";
import { Link } from "react-router-dom";

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

function ReviewText({ review }: Review) {
	const date = `${review.created_at.slice(0, 10)}`;
	return (
		<Container to={`/perfume/${review.perfume_id}`}>
			<PerfumeName>{review.perfume_name}</PerfumeName>
			<Content>{review.content.slice(0, 170)}</Content>
			<DateAndName>
				{date} {review.member_name}
			</DateAndName>
		</Container>
	);
}

export default ReviewText;

const Container = styled(Link)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	position: relative;
	color: #000;
	width: 100%;
`;

const PerfumeName = styled.p`
	font-size: 2rem;
	font-weight: 800;
	position: absolute;
	top: 5rem;
`;

const Content = styled.p`
	width: 26rem;
	font-size: 2rem;
	position: absolute;
	top: 13rem;
	text-align: center;
`;

const DateAndName = styled.p`
	font-size: 1.3rem;
	position: absolute;
	top: 34rem;
`;
