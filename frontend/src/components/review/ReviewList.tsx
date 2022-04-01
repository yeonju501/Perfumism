import reviewApi from "apis/review";
import { DeleteButton, ShowMoreButton, UpdateButton } from "components/button/Button";
import { useEffect, useState } from "react";
import LikeButton from "./LikeButton";
import cookie from "react-cookies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { faStar as star } from "@fortawesome/free-solid-svg-icons";
import ReviewCreateForm from "./ReviewCreateForm";
import ReviewUpdate from "./ReviewUpdate";

interface ReviewListPropType {
	perfumeId: string;
	updateReviews: boolean;
	setUpdateReviews: React.Dispatch<React.SetStateAction<boolean>>;
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

function ReviewList({ perfumeId, updateReviews, setUpdateReviews }: ReviewListPropType) {
	const [reviews, setReviews] = useState<ReviewType[]>([]);
	const [totalPage, setTotalPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [isLastPage, setIsLastPage] = useState(false);
	const [isEditable, setIsEditable] = useState(-1);

	const token = cookie.load("access_token");
	const userId = useSelector((state: RootState) => state.user.id);

	useEffect(() => {
		if (totalPage && currentPage >= totalPage) setIsLastPage(true);
	}, [currentPage]);

	useEffect(() => {
		setCurrentPage(0);
		setReviews([]);
		getReviews(0);
	}, [updateReviews]);

	const getReviews = async (currentPage: number) => {
		const res = await reviewApi.getReviews(perfumeId, currentPage);
		setReviews((prev) => prev.concat(res.data.reviews));
		console.log(res.data.reviews);

		setTotalPage(res.data.total_page_count);
		setCurrentPage(res.data.current_page_count + 1);
	};

	const handleShowMoreClick = () => {
		getReviews(currentPage);
	};

	const handleDeleteClick = async (reviewId: number) => {
		if (window.confirm("리뷰를 삭제 하시겠습니까?")) {
			await reviewApi.deleteReview(reviewId);
			setReviews((reviews) => reviews.filter((review) => review.review_id !== reviewId));
			// setUpdateReviews((prev) => !prev);
		}
	};

	const handleUpdateClick = (reviewId: number) => {
		setIsEditable(reviewId);
	};

	const changeReviewLikes = async (reviewId: number) => {
		const res = await reviewApi.isReviewLiked(reviewId);
		console.log(res.data.is_liked);
		setReviews((reviews) =>
			reviews.map((review) => {
				if (review.review_id === reviewId) {
					res.data.is_liked ? review.likes++ : review.likes--;
				}
				return review;
			}),
		);
	};

	return reviews.length > 0 ? (
		<ul>
			{reviews.map((review) => (
				<li key={review.review_id}>
					<p>{review.member_name}</p>
					{userId === review.member_id && (
						<>
							<UpdateButton onClick={() => handleUpdateClick(review.review_id)}>수정</UpdateButton>
							<DeleteButton onClick={() => handleDeleteClick(review.review_id)}>삭제</DeleteButton>
						</>
					)}
					{review.review_id === isEditable ? (
						<ReviewUpdate
							setUpdateReviews={setUpdateReviews}
							oldContent={review.content}
							reviewId={review.review_id}
							setIsEditable={setIsEditable}
							oldGrade={review.grade}
						/>
					) : (
						<div>
							<p>
								{[...Array(review.grade)].map(() => (
									<FontAwesomeIcon icon={star} key={Math.random()} />
								))}
							</p>
							<p>{review.content}</p>
						</div>
					)}

					{token && (
						<LikeButton reviewId={review.review_id} changeReviewLikes={changeReviewLikes} />
					)}
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
