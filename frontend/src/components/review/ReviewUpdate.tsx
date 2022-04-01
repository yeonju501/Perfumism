import reviewApi from "apis/review";
import { CreateButton } from "components/button/Button";
import { useEffect } from "react";
import { FormContainer } from "./Container";
import StarRating from "./StarRating";
import Textarea from "./Textarea";
import cookie from "react-cookies";
import useReviewForm from "./hooks/useReviewForm";

interface ReviewUpdateProp {
	reviewId: number;
	oldContent: string;
	setIsEditable: React.Dispatch<React.SetStateAction<number>>;
	oldGrade: number;
	setReviews: React.Dispatch<React.SetStateAction<ReviewType[]>>;
}

interface ReviewType {
	review_id: number;
	member_id: number;
	member_name: string;
	member_image: string;
	grade: number;
	content: string;
	likes: number;
}

function ReviewUpdate({
	reviewId,
	setIsEditable,
	oldContent,
	oldGrade,
	setReviews,
}: ReviewUpdateProp) {
	const token = cookie.load("access_token");

	const {
		handleInputChange,
		handleFormSubmit,
		handleNonMemberInputClick,
		grade,
		setGrade,
		content,
		setContent,
	} = useReviewForm({
		sendReviewData: () => {
			return reviewApi.updateReview({ grade, content }, reviewId);
		},
	});

	useEffect(() => {
		setGrade(oldGrade);
		setContent(oldContent);
	}, []);

	return (
		<FormContainer
			onSubmit={async (e) => {
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
			}}
		>
			<StarRating grade={grade} setGrade={setGrade} />
			{token ? (
				<div>
					<Textarea
						value={content}
						onChange={handleInputChange}
						placeholder="리뷰를 입력하세요"
					></Textarea>
					<CreateButton>수정</CreateButton>
				</div>
			) : (
				<Textarea
					placeholder="로그인 후 사용해주세요"
					onClick={handleNonMemberInputClick}
				></Textarea>
			)}
		</FormContainer>
	);
}

export default ReviewUpdate;
