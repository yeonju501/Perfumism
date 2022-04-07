import { useState } from "react";

interface useReviewFormProps {
	sendReviewData: () => Promise<any>;
}

function useReviewForm({ sendReviewData }: useReviewFormProps) {
	const [grade, setGrade] = useState(0);
	const [content, setContent] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value);
	};

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (grade && content.trim()) {
			await sendReviewData();
			setGrade(0);
			setContent("");
		} else {
			alert("평점과 리뷰를 모두 등록해주세요");
		}
	};

	const handleNonMemberInputClick = () => {
		window.location.replace("/signin");
	};

	return {
		handleInputChange,
		handleFormSubmit,
		handleNonMemberInputClick,
		setGrade,
		setContent,
		grade,
		content,
	};
}

export default useReviewForm;
