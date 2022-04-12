import { useState } from "react";

interface Props {
	onSubmit: () => Promise<void>;
}

function useCreateForm({ onSubmit }: Props) {
	const [grade, setGrade] = useState(0);
	const [content, setContent] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value);
	};

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit();
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

export default useCreateForm;
