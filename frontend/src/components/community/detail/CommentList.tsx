import { ShowMoreButton } from "components/button/Button";
import ReviewButtons from "components/review/ReviewButtons";
import ReviewUpdate from "components/review/ReviewUpdate";
import styled from "styled-components";

function CommentList() {
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
						<CommentContent>{review.content}</CommentContent>
					)}
				</ReviewItem>
			))}
			<ShowMoreButton onClick={handleShowMoreClick} isLastPage={isLastPage}>
				Show More
			</ShowMoreButton>
		</ul>
	) : (
		<p style={{ color: "#555555", padding: "0 1rem", fontSize: "1.2rem" }}>
			작성된 댓글이 없습니다
		</p>
	);
}

const ReviewItem = styled.li`
	border: 0.3px solid #dedede;
	margin-bottom: 3rem;
	padding: 1rem 2rem;
`;

const CommentContent = styled.p``;

export default CommentList;
