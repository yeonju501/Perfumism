import { ShowMoreButton } from "components/button/Button";
import styled from "styled-components";
import communityApi from "apis/community";
import useReviewListForm from "components/review/hooks/useReviewListForm";
import CommentUpdate from "./CommentUpdate";
import ReplyForm from "./ReplyForm";
import ReplyUpdate from "./ReplyUpdate";
import CommentButtons from "./CommentButtons";
import ReplyButtons from "./ReplyButtons";

interface CommentListProp {
	articleId: number;
	updateComments: boolean;
}

interface replyType {
	comment_id: number;
	member_id: number;
	member_name: string;
	article_id: number;
	parentId: number;
	content: string;
	created_at: string;
	updated_at: string;
	deleted_at: string;
	deletion: boolean;
}

function CommentList({ updateComments, articleId }: CommentListProp) {
	const {
		userId,
		reviews,
		reply,
		isEditable,
		setReviews,
		setReply,
		setTotalPage,
		setCurrentPage,
		handleReplyDeleteClick,
		setIsEditable,
		handleShowMoreClick,
		handleCommentDeleteClick,
		handleUpdateClick,
		handleReplyClick,
		isLastPage,
	} = useReviewListForm({
		updateReviews: updateComments,
		addReviews: async (currentPage: number) => {
			const res = await communityApi.getComments(articleId, currentPage);
			setReviews(res.data.commentList);
			setTotalPage(res.data.total_page_count);
			setCurrentPage(res.data.current_page_count + 1);
		},
		deleteReviewData: (commentId: number) => {
			return communityApi.deleteComment(articleId, commentId);
		},
		getReviews: async (currentPage: number) => {
			const res = await communityApi.getComments(articleId, currentPage);
			setReviews((prev) => [...prev, ...res.data.commentList]);
			setTotalPage(res.data.total_page_count);
			setCurrentPage(res.data.current_page_count + 1);
		},
	});

	return reviews.length > 0 ? (
		<ul>
			{reviews.map((review, idx) => (
				<li key={idx}>
					<ReviewItem>
						{review.deletion ? (
							<DeletedComment>삭제된 댓글 입니다</DeletedComment>
						) : (
							<ExistComment>
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
										<User>
											<div>
												<span>{review.member_name}</span>
												<span>{review.created_at?.slice(5, 10)}</span>
											</div>
											{userId === review.member_id && (
												<CommentButtons
													handleCommentDeleteClick={handleCommentDeleteClick}
													handleUpdateClick={handleUpdateClick}
													reviewId={review.comment_id}
													replyCount={review.replyList.length}
												/>
											)}
										</User>
										<CommentContent>{review.content}</CommentContent>
										<ReplyButton onClick={() => handleReplyClick(review.comment_id)}>
											답글
										</ReplyButton>
									</>
								)}
							</ExistComment>
						)}
					</ReviewItem>
					{review.comment_id === reply && (
						<ReplyForm
							articleId={articleId}
							commentId={review.comment_id}
							setReply={setReply}
							commentIdx={idx}
							setReviews={setReviews}
						/>
					)}
					{review.replyList.map(
						(reply: replyType, idx) =>
							!reply.deletion && (
								<ReplyItem key={idx}>
									{reply.comment_id === isEditable ? (
										<ReplyUpdate
											oldContent={reply.content}
											articleId={articleId}
											parentId={reply.parentId}
											commentId={reply.comment_id}
											setIsEditable={setIsEditable}
											setReviews={setReviews}
										/>
									) : (
										<>
											<User>
												<div>
													<span>{reply.member_name}</span>
													<span>{reply.created_at.slice(5, 10)}</span>
												</div>
												{userId === reply.member_id && (
													<ReplyButtons
														handleReplyDeleteClick={handleReplyDeleteClick}
														handleUpdateClick={handleUpdateClick}
														parentId={reply.parentId}
														commentId={reply.comment_id}
													/>
												)}
											</User>
											<CommentContent>{reply.content}</CommentContent>
										</>
									)}
								</ReplyItem>
							),
					)}
				</li>
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

const ReviewItem = styled.div`
	border: 0.3px solid #dedede;
	margin-bottom: 3rem;
	padding: 1rem 2rem;
`;

const ExistComment = styled.div``;

const DeletedComment = styled.p`
	font-size: 1.4rem;
`;

const ReplyItem = styled.div`
	border: 0.3px solid #dedede;
	margin-bottom: 3rem;
	padding: 1rem 2rem;
	width: 95%;
	margin-left: auto;
`;

const User = styled.div`
	display: flex;
	font-size: 1.2rem;
	align-items: center;
	justify-content: space-between;
	div {
		span:first-child {
			color: #191919;
			font-size: 1.2rem;
			font-weight: bold;
			margin-right: 1rem;
		}
		span:last-child {
			color: #595959;
			font-size: 0.7rem;
		}
	}
`;

const CommentContent = styled.p`
	font-size: 1.5rem;
	margin-bottom: 2.2rem;
	word-break: break-all;
`;

const ReplyButton = styled.button`
	background-color: inherit;
	border: none;
	outline: none;
	cursor: pointer;
	padding: 0;
`;

export default CommentList;
