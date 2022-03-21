import reviewApi from "apis/review";
import { ShowMoreButton } from "components/button/Button";
import { useEffect, useState } from "react";
import { Container } from "./Container";

interface ReviewListPropType {
	perfumeId: number;
}

interface ReviewType {
	review_id: number;
	member_id: number;
	member_name: string;
	member_image: string;
	grade: number;
	content: string;
	likes: number;
}

function ReviewList({ perfumeId }: ReviewListPropType) {
	const [reviews, setReviews] = useState([
		{
			review_id: 1,
			member_id: 1,
			member_name: "이승기",
			member_image: "eocnddlalwlvkdlfdlfma.jpg",
			grade: 4,
			content: "이 향수는 마치 꽃이 무수하게 핀 들판의 공기를 그대로 가져온듯 한 향...",
			likes: 222,
		},
		{
			review_id: 2,
			member_id: 1,
			member_name: "이승기",
			member_image: "eocnddlalwlvkdlfdlfma.jpg",
			grade: 4,
			content: "이 향수는 마치 꽃이 무수하게 핀 들판의 공기를 그대로 가져온듯 한 향...",
			likes: 222,
		},
		{
			review_id: 3,
			member_id: 1,
			member_name: "이승기",
			member_image: "eocnddlalwlvkdlfdlfma.jpg",
			grade: 4,
			content: "이 향수는 마치 꽃이 무수하게 핀 들판의 공기를 그대로 가져온듯 한 향...",
			likes: 222,
		},
	]);
	const [totalPage, setTotalPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		// getReviews();
	}, []);

	const getReviews = async () => {
		await reviewApi.getReviews(perfumeId, currentPage).then((res) => {
			setReviews(res.data.reviews);
			setTotalPage(res.data.total_page_count);
			setCurrentPage(res.data.current_page_count);
		});
	};

	return reviews.length > 0 ? (
		<ul>
			{reviews.map((review: ReviewType) => (
				<li key={review.review_id}>{review.content}</li>
			))}
			<ShowMoreButton>Show More</ShowMoreButton>
		</ul>
	) : (
		<p>작성된 리뷰가 없습니다</p>
	);
}

export default ReviewList;
