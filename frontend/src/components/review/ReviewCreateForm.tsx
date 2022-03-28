import reviewApi from "apis/review";
import { CreateButton } from "components/button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormContainer } from "./Container";
import StarRating from "./StarRating";
import Textarea from "./Textarea";
import cookie from "react-cookies";

interface ReviewCreateFormProp {
	perfumeId: string;
}

function ReviewCreateForm({ perfumeId }: ReviewCreateFormProp) {
	const navigate = useNavigate();
	const token = cookie.load("access_token");

	const [grade, setGrade] = useState(0);
	const [content, setContent] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value);
	};

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await reviewApi.createReview({ grade, content }, perfumeId);
		setContent("");
		setGrade(0);
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
