import reviewApi from "apis/review";
import { useEffect, useState } from "react";
import Section from "./Section";

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
