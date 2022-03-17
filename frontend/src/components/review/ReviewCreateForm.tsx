import { useState } from "react";
import StarRating from "./StarRating";

function ReviewCreateForm() {
	const [grade, setGrade] = useState(0);
	const [content, setContent] = useState("");

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setContent("");
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<StarRating setGrade={setGrade} />
			<textarea></textarea>
			<button>작성</button>
		</form>
	);
}

export default ReviewCreateForm;
