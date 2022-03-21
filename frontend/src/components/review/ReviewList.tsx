import { useState } from "react";

interface ReviewListPropType {
	perfumeId: number;
}

interface ReviewsType {
	review_id: number;
	member_id: number;
	member_name: string;
	member_iamge: string;
	grade: number;
	content: string;
	likes: number;
}

function ReviewList({ perfumeId }: ReviewListPropType) {
	const [reviews, setReviews] = useState<ReviewsType | null>(null);
	const [totalPage, setTotalPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);

	return <div></div>;
}

export default ReviewList;
