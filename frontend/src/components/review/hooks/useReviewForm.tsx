import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface useReviewFormProps {
	sendReviewData: () => Promise<any>;
}

function useReviewForm({ sendReviewData }: useReviewFormProps) {
	const navigate = useNavigate();
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
		navigate("/signin");
	};

	return {
		handleInputChange,
		handleFormSubmit,
		handleNonMemberInputClick,
		grade,
		setGrade,
		content,
		setContent,
	};
}

export default useReviewForm;
