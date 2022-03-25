import reviewApi from "apis/review";
import { CreateButton } from "components/button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormContainer } from "./Container";
import StarRating from "./StarRating";
import Textarea from "./Textarea";

interface ReviewCreateFormProp {
	perfumeId: string;
}

function ReviewCreateForm({ perfumeId }: ReviewCreateFormProp) {
	const navigate = useNavigate();

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
			<Textarea
				value={content}
				onChange={handleInputChange}
				placeholder="리뷰를 입력하세요"
			></Textarea>
			<Textarea placeholder="로그인 후 사용해주세요" onClick={handleNonMemberInputClick}></Textarea>
			<CreateButton>작성</CreateButton>
		</FormContainer>
	);
}

export default ReviewCreateForm;
