import { ShowMoreButton } from "components/button/Button";
import ReviewButtons from "components/review/ReviewButtons";
import ReviewUpdate from "components/review/ReviewUpdate";
import styled from "styled-components";
import communityApi from "apis/community";
import useReviewListForm from "components/review/hooks/useReviewListForm";
import CommentUpdate from "./CommentUpdate";
import ReplyForm from "./ReplyForm";

interface CommentListProp {
	articleId: number;
	updateReviews: boolean;
}

function CommentList({ updateReviews, articleId }: CommentListProp) {
	console.log(articleId);

	const {
		userId,
		reviews,
		reply,
		isEditable,
		setReviews,
		setTotalPage,
		setCurrentPage,
		setIsEditable,
		handleShowMoreClick,
		handleDeleteClick,
		handleUpdateClick,
		handleReplyClick,
		isLastPage,
	} = useReviewListForm({
		updateReviews,
		getReviews: async (currentPage: number) => {
			const res = await communityApi.getComments(articleId, currentPage);
			setReviews((prev) => prev.concat(res.data.commentList));
			setTotalPage(res.data.total_page_count);
			setCurrentPage(res.data.current_page_count + 1);
		},
		deleteReviewData: (commentId: number) => {
			return communityApi.deleteComment(articleId, commentId);
		},
	});

	return reviews.length > 0 ? (
		<ul>
			{reviews.map((review) => (
				<ReviewItem key={review.comment_id}>
					<p>{review.member_name}</p>
					{userId === review.member_id && (
						<ReviewButtons
							handleDeleteClick={handleDeleteClick}
							handleUpdateClick={handleUpdateClick}
							reviewId={review.comment_id}
						/>
					)}
					<button onClick={() => handleReplyClick(review.comment_id)}>답글</button>
					{review.comment_id === isEditable ? (
						<CommentUpdate
							oldContent={review.content}
							articleId={articleId}
							commentId={review.comment_id}
							setIsEditable={setIsEditable}
							setReviews={setReviews}
						/>
					) : (
						<>
							<CommentContent>{review.content}</CommentContent>
							{review.comment_id === reply && (
								<ReplyForm articleId={articleId} commentId={review.comment_id} />
							)}
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
