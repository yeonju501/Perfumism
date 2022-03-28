import reviewApi from "apis/review";
import { ShowMoreButton } from "components/button/Button";
import { useEffect, useState } from "react";
import LikeButton from "./LikeButton";
import cookie from "react-cookies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heart } from "@fortawesome/free-solid-svg-icons";

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
	const [isLastPage, setIsLastPage] = useState(false);
	const token = cookie.load("access_token");

	useEffect(() => {
		getReviews();
	}, []);

	useEffect(() => {
		if (totalPage && currentPage >= totalPage) setIsLastPage(true);
	}, [currentPage]);

	const getReviews = async () => {
		await reviewApi.getReviews(perfumeId, currentPage).then((res) => {
			setReviews((prev) => prev.concat(res.data.reviews));
			setTotalPage(res.data.total_page_count);
			setCurrentPage(res.data.current_page_count + 1);
		});
	};

	const handleShowMoreClick = () => {
		getReviews();
	};

	return reviews.length > 0 ? (
		<ul>
			{reviews.map((review) => (
				<li key={review.review_id}>
					<p>{review.member_name}</p>
					<p>{review.grade}</p>
					<p>{review.content}</p>
					{token && <LikeButton reviewId={review.review_id} />}
					<FontAwesomeIcon icon={heart} />
					<span>{review.likes}</span>
					<hr />
				</li>
			))}
			<ShowMoreButton onClick={handleShowMoreClick} isLastPage={isLastPage}>
				Show More
			</ShowMoreButton>
		</ul>
	) : (
		<p>작성된 리뷰가 없습니다</p>
	);
}

export default ReviewList;
