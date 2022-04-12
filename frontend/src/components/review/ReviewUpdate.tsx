import reviewApi from "apis/review";
import { CreateButton } from "components/button/Button";
import { useEffect } from "react";
import { FormContainer } from "./Container";
import StarRating from "./StarRating";
import Textarea from "./Textarea";
import useReviewForm from "./hooks/useCreateForm";
import styled from "styled-components";
import { Review } from "types/review";

interface Props {
	reviewId: number;
	oldContent: string;
	oldGrade: number;
	setIsEditable: React.Dispatch<React.SetStateAction<number>>;
	setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

function ReviewUpdate({ oldContent, oldGrade, reviewId, setIsEditable, setReviews }: Props) {
	const { handleInputChange, handleFormSubmit, setGrade, grade, content, setContent } =
		useReviewForm({
			onSubmit: async () => {
				if (content.trim() && grade) {
					await reviewApi.updateReview({ grade, content }, reviewId);
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
				} else {
					alert("평점과 리뷰 내용을 모두 입력해주세요");
				}
			},
		});

	useEffect(() => {
		setGrade(oldGrade);
		setContent(oldContent);
	}, []);

	return (
		<FormContainer onSubmit={handleFormSubmit}>
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
