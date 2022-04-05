import reviewApi from "apis/review";
import { ShowMoreButton } from "components/button/Button";
import LikeButton from "./LikeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as star } from "@fortawesome/free-solid-svg-icons";
import ReviewUpdate from "./ReviewUpdate";
import styled from "styled-components";
import ReviewButtons from "./ReviewButtons";
import useReviewListForm from "./hooks/useReviewListForm";

interface ReviewListPropType {
	perfumeId: string;
	updateReviews: boolean;
}

function ReviewList({ perfumeId, updateReviews }: ReviewListPropType) {
	const {
		userId,
		reviews,
		isEditable,
		setReviews,
		setIsEditable,
		setTotalPage,
		setCurrentPage,
		handleShowMoreClick,
		handleDeleteClick,
		handleUpdateClick,
		isLastPage,
	} = useReviewListForm({
		updateReviews,
		getReviews: async (currentPage: number) => {
			const res = await reviewApi.getReviews(perfumeId, currentPage);
			setReviews((prev) => prev.concat(res.data.reviews));
			setTotalPage(res.data.total_page_count);
			setCurrentPage(res.data.current_page_count + 1);
		},
		deleteReviewData: (reviewId: number) => {
			return reviewApi.deleteReview(reviewId);
		},
	});

	const changeReviewLikes = async (reviewId: number) => {
		const res = await reviewApi.isReviewLiked(reviewId);
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
				<ReviewItem key={review.review_id}>
					<p>{review.member_name}</p>
					{userId === review.member_id && (
						<ReviewButtons
							handleDeleteClick={handleDeleteClick}
							handleUpdateClick={handleUpdateClick}
							reviewId={review.review_id}
						/>
					)}
					{review.review_id === isEditable ? (
						<ReviewUpdate
							oldContent={review.content}
							oldGrade={review.grade}
							reviewId={review.review_id}
							setIsEditable={setIsEditable}
							setReviews={setReviews}
						/>
					) : (
						<ReviewContent>
							<p>
								{[...Array(review.grade)].map(() => (
									<FontAwesomeIcon icon={star} key={Math.random()} color="#ffcb14" />
								))}
							</p>
							<p>{review.content}</p>
						</ReviewContent>
					)}

					{userId && (
						<LikeButton reviewId={review.review_id} changeReviewLikes={changeReviewLikes} />
					)}
					<span>{review.likes}</span>
				</ReviewItem>
			))}
			<ShowMoreButton onClick={handleShowMoreClick} isLastPage={isLastPage}>
				Show More
			</ShowMoreButton>
		</ul>
	) : (
		<p style={{ color: "#555555", padding: "0 1rem", fontSize: "1.2rem" }}>
			작성된 리뷰가 없습니다
		</p>
	);
}

const ReviewItem = styled.li`
	border: 0.3px solid #dedede;
	margin-bottom: 3rem;
	padding: 1rem 2rem;
`;

const ReviewContent = styled.div``;
export default ReviewList;
