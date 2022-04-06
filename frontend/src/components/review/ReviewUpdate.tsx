import reviewApi from "apis/review";
import { CreateButton } from "components/button/Button";
import { useEffect } from "react";
import { FormContainer } from "./Container";
import StarRating from "./StarRating";
import Textarea from "./Textarea";
import useReviewForm from "./hooks/useReviewForm";
import styled from "styled-components";

interface ReviewUpdateProp {
	reviewId: number;
	oldContent: string;
	setIsEditable: React.Dispatch<React.SetStateAction<number>>;
	oldGrade: number;
	setReviews: React.Dispatch<React.SetStateAction<ReviewType[]>>;
}

interface ReviewType {
	comment_id: number;
	review_id: number;
	member_id: number;
	member_name: string;
	member_image: string;
	grade: number;
	content: string;
	likes: number;
	replyList: replyType[];
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

function ReviewUpdate({
	oldContent,
	oldGrade,
	reviewId,
	setIsEditable,
	setReviews,
}: ReviewUpdateProp) {
	const { handleInputChange, handleFormSubmit, setGrade, grade, content, setContent } =
		useReviewForm({
			sendReviewData: () => {
				return reviewApi.updateReview({ grade, content }, reviewId);
			},
		});

	useEffect(() => {
		setGrade(oldGrade);
		setContent(oldContent);
	}, []);

	const handleReviewUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
		await handleFormSubmit(e);
		setIsEditable(-1);
		setReviews((reviews) =>
			reviews.map((review) => {
				if (review.review_id === reviewId) {
					review.grade = grade;
					review.content = content;
				}
				return review;
			}),
		);
	};

	return (
		<FormContainer onSubmit={handleReviewUpdate}>
			<StarRating grade={grade} setGrade={setGrade} />
			<Div>
				<Textarea
					value={content}
					onChange={handleInputChange}
					placeholder="리뷰를 수정하세요"
				></Textarea>
				<CreateButton>수정</CreateButton>
			</Div>
		</FormContainer>
	);
}

const Div = styled.div`
	display: flex;
`;

export default ReviewUpdate;
