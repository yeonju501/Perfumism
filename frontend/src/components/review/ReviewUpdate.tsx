import reviewApi from "apis/review";
import { CreateButton } from "components/button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormContainer } from "./Container";
import StarRating from "./StarRating";
import Textarea from "./Textarea";
import cookie from "react-cookies";
import useReviewForm from "./hooks/useReviewForm";

interface ReviewUpdateProp {
	reviewId: number;
	setUpdateReviews: React.Dispatch<React.SetStateAction<boolean>>;
	oldContent?: string | undefined;
	setIsEditable: React.Dispatch<React.SetStateAction<number>>;
	oldGrade?: number | undefined;
}

function ReviewUpdate({ reviewId, setIsEditable, oldContent, oldGrade }: ReviewUpdateProp) {
	const token = cookie.load("access_token");

	const {
		handleInputChange,
		handleFormSubmit,
		handleNonMemberInputClick,
		grade,
		setGrade,
		content,
	} = useReviewForm({
		sendReviewData: () => {
			return reviewApi.updateReview({ grade, content }, reviewId);
		},
	});

	return (
		<FormContainer
			onSubmit={async (e) => {
				await handleFormSubmit(e);
				setIsEditable(-1);
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
