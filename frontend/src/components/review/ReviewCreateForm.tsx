import reviewApi from "apis/review";
import { useState } from "react";
import StarRating from "./StarRating";

interface ReviewCreateFormProp {
	perfumeId: number;
}

function ReviewCreateForm({ perfumeId }: ReviewCreateFormProp) {
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

	return (
		<form onSubmit={handleFormSubmit}>
			<StarRating grade={grade} setGrade={setGrade} />
			<textarea
				value={content}
				onChange={handleInputChange}
				placeholder="리뷰를 입력하세요"
			></textarea>
			<button>작성</button>
		</form>
	);
}

export default ReviewCreateForm;
