import reviewApi from "apis/review";
import { useEffect, useState } from "react";
import { Container } from "./Container";

interface ReviewListPropType {
	perfumeId: number;
}

interface ReviewType {
	review_id: number;
	member_id: number;
	member_name: string;
	member_iamge: string;
	grade: number;
	content: string;
	likes: number;
}

function ReviewList({ perfumeId }: ReviewListPropType) {
	const [reviews, setReviews] = useState([]);
	const [totalPage, setTotalPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		getReviews();
	}, []);

	const getReviews = async () => {
		await reviewApi.getReviews(perfumeId).then((res) => {
			setReviews(res.data.reviews);
			setTotalPage(res.data.total_page_count);
			setCurrentPage(res.data.current_page_count);
		});
	};

	return reviews.length > 0 ? (
		<Container>
			{reviews.map((review: ReviewType) => (
				<p>{review.content}</p>
			))}
		</Container>
	) : (
		<p>작성된 리뷰가 없습니다</p>
	);
}

export default ReviewList;
