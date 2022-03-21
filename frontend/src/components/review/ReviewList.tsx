import reviewApi from "apis/review";
import { ShowMoreButton } from "components/button/Button";
import { useEffect, useState } from "react";

interface ReviewListPropType {
	perfumeId: string;
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
	const [reviews, setReviews] = useState<ReviewType[]>([]);
	const [totalPage, setTotalPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		getReviews();
	}, []);

	const getReviews = async () => {
		await reviewApi.getReviews(perfumeId, currentPage).then((res) => {
			setReviews([...reviews, ...res.data.reviews]);
			setTotalPage(res.data.total_page_count);
			setCurrentPage(res.data.current_page_count);
		});
	};

	// const handleShowMoreClick = () => {
	// 	setCurrentPage((prev) => prev + 1);
	// 	console.log(currentPage);
	// 	getReviews();
	// };

	return reviews.length > 0 ? (
		<ul>
			{reviews.map((review) => (
				<li key={review.review_id}>{review.content}</li>
			))}
			{/* current랑 total page 체크해서 두개가 같다면 display none으로 주기 */}
			<ShowMoreButton>Show More</ShowMoreButton>
		</ul>
	) : (
		<p>작성된 리뷰가 없습니다</p>
	);
}

export default ReviewList;
