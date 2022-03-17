import { useState } from "react";
import StarRating from "./StarRating";

function ReviewCreateForm() {
	const [rating, setRating] = useState(0);

	return (
		<form>
			<StarRating setRating={setRating} />
			<textarea></textarea>
			<button>작성</button>
		</form>
	);
}

export default ReviewCreateForm;
