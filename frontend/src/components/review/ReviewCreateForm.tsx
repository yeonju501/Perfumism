import reviewApi from "apis/review";
import { CreateButton } from "components/button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormContainer } from "./Container";
import StarRating from "./StarRating";
import Textarea from "./Textarea";
import cookie from "react-cookies";
import useReviewForm from "./hooks/useReviewForm";

interface ReviewCreateFormProp {
	perfumeId: string;
	setUpdateReviews: React.Dispatch<React.SetStateAction<boolean>>;
}

function ReviewCreateForm({ perfumeId, setUpdateReviews }: ReviewCreateFormProp) {
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
			return reviewApi.createReview({ grade, content }, perfumeId);
		},
	});

	return (
		<FormContainer
			onSubmit={async (e) => {
				await handleFormSubmit(e);
				setUpdateReviews((prev) => !prev);
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
					<CreateButton>작성</CreateButton>
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

export default ReviewCreateForm;
