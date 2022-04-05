import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";

interface ReviewType {
	review_id: number;
	member_id: number;
	member_name: string;
	member_image: string;
	grade: number;
	content: string;
	likes: number;
}

interface useReviewListFormProps {
	updateReviews: boolean;
	getReviewData: (currentPage: number) => Promise<any>;
	deleteReviewData: (reviewId: number) => Promise<any>;
}

function useReviewListForm({
	updateReviews,
	getReviewData,
	deleteReviewData,
}: useReviewListFormProps) {
	const userId = useSelector((state: RootState) => state.user.id);

	const [reviews, setReviews] = useState<ReviewType[]>([]);
	const [totalPage, setTotalPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [isLastPage, setIsLastPage] = useState(false);
	const [isEditable, setIsEditable] = useState(-1);

	useEffect(() => {
		if (totalPage && currentPage >= totalPage) setIsLastPage(true);
	}, [currentPage]);

	useEffect(() => {
		setCurrentPage(0);
		setReviews([]);
		getReviews(0);
	}, [updateReviews]);

	const getReviews = async (currentPage: number) => {
		const res = await getReviewData(currentPage);
		setReviews((prev) => prev.concat(res.data.reviews));
		setTotalPage(res.data.total_page_count);
		setCurrentPage(res.data.current_page_count + 1);
	};

	const handleShowMoreClick = () => {
		getReviews(currentPage);
	};

	const handleDeleteClick = async (reviewId: number) => {
		if (window.confirm("리뷰를 삭제 하시겠습니까?")) {
			await deleteReviewData(reviewId);
			setReviews((reviews) => reviews.filter((review) => review.review_id !== reviewId));
		}
	};

	const handleUpdateClick = (reviewId: number) => {
		setIsEditable(reviewId);
	};

	return {
		userId,
		reviews,
		isEditable,
		setReviews,
		setIsEditable,
		handleShowMoreClick,
		handleDeleteClick,
		handleUpdateClick,
		isLastPage,
	};
}

export default useReviewListForm;
