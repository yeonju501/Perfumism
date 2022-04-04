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
		await sendReviewData();
		setGrade(0);
		setContent("");
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
