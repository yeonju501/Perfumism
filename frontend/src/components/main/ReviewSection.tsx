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
				{reviews.slice(0, 3).map((review, idx) => (
					<ReviewText review={review} key={idx} />
				))}
			</Section>
		)
	);
}

export default ReviewSection;

const Section = styled.section`
	display: flex;
	width: 100%;
	height: 50rem;
`;
