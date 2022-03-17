import StarRating from "./StarRating";

function ReviewCreateForm() {
	return (
		<form>
			<StarRating />
			<textarea></textarea>
			<button>작성</button>
		</form>
	);
}

export default ReviewCreateForm;
