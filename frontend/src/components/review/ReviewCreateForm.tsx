import reviewApi from "apis/review";
import { CreateButton } from "components/button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormContainer } from "./Container";
import StarRating from "./StarRating";
import Textarea from "./Textarea";
import cookie from "react-cookies";

interface ReviewCreateFormProp {
	perfumeId?: string | undefined;
	reviewId?: number | undefined;
	setUpdateReviews: React.Dispatch<React.SetStateAction<boolean>>;
	oldContent?: string | undefined;
	setIsEditable?: React.Dispatch<React.SetStateAction<number>>;
	oldGrade?: number | undefined;
}

function ReviewCreateForm({
	perfumeId,
	reviewId,
	setUpdateReviews,
	oldContent,
	setIsEditable,
	oldGrade,
}: ReviewCreateFormProp) {
	const navigate = useNavigate();
	const token = cookie.load("access_token");

	const [grade, setGrade] = useState(oldGrade || 0);
	const [content, setContent] = useState(oldContent || "");

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value);
	};

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (perfumeId) await reviewApi.createReview({ grade, content }, perfumeId);
		else if (setIsEditable) {
			await reviewApi.updateReview({ grade, content }, reviewId);
			setIsEditable(-1);
		}
		setGrade(0);
		setContent("");
		setUpdateReviews((prev) => !prev);
	};

	const handleNonMemberInputClick = () => {
		navigate("/signin");
	};

	return (
		<FormContainer onSubmit={handleFormSubmit}>
			<StarRating grade={grade} setGrade={setGrade} />
			{token ? (
				<div>
					<Textarea
						value={content}
						onChange={handleInputChange}
						placeholder="리뷰를 입력하세요"
					></Textarea>
					<CreateButton>{perfumeId ? "작성" : "수정"}</CreateButton>
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
