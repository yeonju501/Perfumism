import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { Review } from "types/review";

interface Props {
	updateReviews: boolean;
	addReviews: (currentPage: number) => Promise<void>;
	getReviews: (currentPage: number) => Promise<void>;
	deleteReviewData: (reviewId: number) => Promise<any>;
}

function useReviewListForm({ updateReviews, addReviews, getReviews, deleteReviewData }: Props) {
	const userId = useSelector((state: RootState) => state.user.id);

	const [reviews, setReviews] = useState<Review[]>([]);
	const [totalPage, setTotalPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [isLastPage, setIsLastPage] = useState(false);
	const [isEditable, setIsEditable] = useState(-1);
	const [reply, setReply] = useState(-1);

	useEffect(() => {
		if (totalPage && currentPage >= totalPage) setIsLastPage(true);
	}, [currentPage]);

	useEffect(() => {
		addReviews(0);
	}, [updateReviews]);

	const handleShowMoreClick = () => {
		getReviews(currentPage);
	};

	const handleDeleteClick = async (reviewId: number) => {
		if (window.confirm("리뷰를 삭제 하시겠습니까?")) {
			await deleteReviewData(reviewId);
			setReviews((reviews) =>
				reviews.filter((review) => (review.review_id || review.comment_id) !== reviewId),
			);
		}
	};

	const handleCommentDeleteClick = async (reviewId: number, replyCount: number) => {
		if (window.confirm("댓글을 삭제 하시겠습니까?")) {
			await deleteReviewData(reviewId);
			if (replyCount) {
				setReviews((reviews) =>
					reviews.map((review) => {
						if (review.comment_id === reviewId) review.deletion = true;
						return review;
					}),
				);
			} else {
				setReviews((reviews) => reviews.filter((review) => review.comment_id !== reviewId));
			}
		}
	};

	const handleReplyDeleteClick = async (parentId: number, commentId: number) => {
		if (window.confirm("답글을 삭제 하시겠습니까?")) {
			await deleteReviewData(commentId);
			setReviews((reviews) =>
				reviews.map((review) => {
					if (review.comment_id === parentId) {
						review.replyList.map((reply) => {
							if (reply.comment_id === commentId) reply.deletion = true;
						});
					}
					return review;
				}),
			);
		}
	};

	const handleUpdateClick = (reviewId: number) => {
		setIsEditable(reviewId);
	};

	const handleReplyClick = (commentId: number) => {
		reply === -1 ? setReply(commentId) : setReply(-1);
	};

	return {
		userId,
		reply,
		reviews,
		isEditable,
		setReply,
		setReviews,
		setIsEditable,
		setTotalPage,
		setCurrentPage,
		handleShowMoreClick,
		handleCommentDeleteClick,
		handleReplyDeleteClick,
		handleDeleteClick,
		handleUpdateClick,
		handleReplyClick,
		isLastPage,
	};
}

export default useReviewListForm;
