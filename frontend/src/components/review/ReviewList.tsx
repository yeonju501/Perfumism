import reviewApi from "apis/review";
import { ShowMoreButton } from "components/button/Button";
import LikeButton from "./LikeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as star } from "@fortawesome/free-solid-svg-icons";
import ReviewUpdate from "./ReviewUpdate";
import styled from "styled-components";
import ReviewButtons from "./ReviewButtons";
import useReviewListForm from "./hooks/useReviewListForm";

interface Props {
	perfumeId: string;
	updateReviews: boolean;
}

function ReviewList({ perfumeId, updateReviews }: Props) {
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
		addReviews: async (currentPage: number) => {
			const res = await reviewApi.getReviews(perfumeId, currentPage);
			setReviews(res.data.reviews);
			setTotalPage(res.data.total_page_count);
			setCurrentPage(res.data.current_page_count + 1);
		},
		deleteReviewData: (reviewId: number) => {
			return reviewApi.deleteReview(reviewId);
		},
		getReviews: async (currentPage: number) => {
			const res = await reviewApi.getReviews(perfumeId, currentPage);
			setReviews((prev) => [...prev, ...res.data.reviews]);
			setTotalPage(res.data.total_page_count);
			setCurrentPage(res.data.current_page_count + 1);
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
					{review.review_id === isEditable ? (
						<ReviewUpdate
							oldContent={review.content}
							oldGrade={review.grade}
							reviewId={review.review_id}
							setIsEditable={setIsEditable}
							setReviews={setReviews}
						/>
					) : (
						<>
							<Grade>
								<div>
									{[...Array(review.grade)].map(() => (
										<FontAwesomeIcon icon={star} key={Math.random()} color="#ffcb14" />
									))}
									<span>{review.grade}</span>
								</div>
								{userId === review.member_id && (
									<ReviewButtons
										handleDeleteClick={handleDeleteClick}
										handleUpdateClick={handleUpdateClick}
										reviewId={review.review_id}
									/>
								)}
							</Grade>
							<ReviewContent>{review.content}</ReviewContent>
							<Footer>
								<User>
									<p>{review.member_name}</p>
									<p>{review.created_at?.slice(0, 10)}</p>
								</User>
								<Like>
									{userId ? (
										<>
											{userId !== review.member_id && (
												<LikeButton
													reviewId={review.review_id}
													changeReviewLikes={changeReviewLikes}
												/>
											)}
											{review.likes ? <span>{review.likes}</span> : null}
										</>
									) : (
										<p>❤ {review.likes}</p>
									)}
								</Like>
							</Footer>
						</>
					)}
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

const Grade = styled.div`
	display: flex;
	align-items: center;
	span {
		margin-left: 1rem;
		font-size: 1.2rem;
	}
	justify-content: space-between;
`;

const User = styled.div`
	display: flex;
	font-size: 1.2rem;
	align-items: center;
	p {
		margin: 0;
	}
	p:nth-child(2) {
		color: #555555;
		margin-left: 1rem;
		font-size: 1.1rem;
	}
`;

const Like = styled.div`
	text-align: end;
`;

const Footer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const ReviewContent = styled.p`
	margin: 3rem 0;
	font-size: 1.6rem;
`;
export default ReviewList;
