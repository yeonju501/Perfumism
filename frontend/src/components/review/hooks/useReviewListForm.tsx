import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";

interface ReviewType {
	comment_id: number;
	review_id: number;
	member_id: number;
	member_name: string;
	member_image: string;
	grade: number;
	content: string;
	likes: number;
	replyList: [];
}

interface useReviewListFormProps {
	updateReviews: boolean;
	getReviews: (currentPage: number) => Promise<void>;
	deleteReviewData: (reviewId: number) => Promise<any>;
}

function useReviewListForm({
	updateReviews,
	getReviews,
	deleteReviewData,
}: useReviewListFormProps) {
	const userId = useSelector((state: RootState) => state.user.id);

	const [reviews, setReviews] = useState<ReviewType[]>([]);
	const [totalPage, setTotalPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [isLastPage, setIsLastPage] = useState(false);
	const [isEditable, setIsEditable] = useState(-1);
	const [reply, setReply] = useState(-1);

	useEffect(() => {
		if (totalPage && currentPage >= totalPage) setIsLastPage(true);
	}, [currentPage]);

	useEffect(() => {
		setCurrentPage(0);
		setReviews([]);
		getReviews(0);
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

	const handleUpdateClick = (reviewId: number) => {
		setIsEditable(reviewId);
	};

	const handleReplyClick = (commentId: number) => {
		reply === -1 ? setReply(commentId) : setReply(-1);
		console.log(reply);
	};

	return {
		userId,
		reply,
		reviews,
		isEditable,
		setReviews,
		setIsEditable,
		setTotalPage,
		setCurrentPage,
		handleShowMoreClick,
		handleDeleteClick,
		handleUpdateClick,
		handleReplyClick,
		isLastPage,
	};
}

export default useReviewListForm;
