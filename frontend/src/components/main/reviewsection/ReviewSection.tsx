import reviewApi from "apis/review";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ReviewText from "./ReviewText";

function ReviewSection() {
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		const getReview = async () => {
			const review = await reviewApi.getLatestReviews();
			setReviews(review.data.reviews);
		};
		getReview();
	}, []);

	return (
		reviews && (
			<Section>
				<Container>
					{reviews.slice(0, 4).map((review, idx) => (
						<ReviewText review={review} key={idx} />
					))}
				</Container>
			</Section>
		)
	);
}

export default ReviewSection;

const Section = styled.section`
	display: flex;
	justify-content: space-between;
	height: 50rem;
	width: 100vw;
	overflow-x: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
`;

const Container = styled.div`
	display: flex;
	margin: 0 auto;
`;
