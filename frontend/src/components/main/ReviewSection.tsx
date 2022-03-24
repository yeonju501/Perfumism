import reviewApi from "apis/review";
import { useEffect, useState } from "react";
import styled from "styled-components";

function ReviewSection() {
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		const getReview = async () => {
			const review = await reviewApi.getLatestReviews();
			setReviews(review.data.reviews);
		};
		getReview();
	}, []);

	return <Section></Section>;
}

export default ReviewSection;

const Section = styled.section`
	display: flex;
	width: 100%;
	height: 50rem;
`;
