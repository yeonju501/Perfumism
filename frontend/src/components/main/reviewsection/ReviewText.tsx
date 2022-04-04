import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface Perfume {
	content: string;
	created_at: string;
	grade: number;
	member_id: number;
	member_image?: string;
	member_name: string;
	perfume_id: number;
	perfume_name: string;
	review_id: number;
}

interface Review {
	review: Perfume;
}

function ReviewText({ review }: Review) {
	const date = `${review.created_at.slice(0, 10).replace(/-/g, ".")}`;
	return (
		<Container to={`/perfume/${review.perfume_id}`}>
			<PerfumeName>{review.perfume_name}</PerfumeName>
			<Content>
				{review.content.length >= 90 ? `${review.content.slice(0, 90)}...` : review.content}
			</Content>
			<Writer>
				<Date>{date}</Date> {review.member_name}
			</Writer>

			<Grade>
				<FontAwesome icon={faStar} />
				{review.grade}
			</Grade>
		</Container>
	);
}

export default ReviewText;

const Container = styled(Link)`
	display: flex;
	position: relative;
	justify-content: center;
	color: #000;
	width: 25rem;
	margin: 0 2rem;
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

const Writer = styled.p`
	font-size: 1.4rem;
	position: absolute;
	top: 31rem;
`;
const Date = styled.span`
	font-size: 1.2rem;
	margin: 0;
`;

const Grade = styled.p`
	font-size: 1.3rem;
	position: absolute;
	top: 34rem;
`;

const FontAwesome = styled(FontAwesomeIcon)`
	color: rgb(244, 174, 61);
	margin-right: 0.5rem;
`;
