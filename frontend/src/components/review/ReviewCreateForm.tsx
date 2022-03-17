import { useState } from "react";
import StarRating from "./StarRating";

function ReviewCreateForm() {
	const [grade, setGrade] = useState(0);
	const [content, setContent] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value);
	};

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setContent("");
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<StarRating setGrade={setGrade} />
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
