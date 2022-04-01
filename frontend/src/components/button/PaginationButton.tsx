interface IProps {
	setData: React.Dispatch<React.SetStateAction<dataType>>;
	idx: number;
	text: string;
}

interface articleList {
	article_id: number;
	member_id: number;
	member_name: string;
	subject: string;
	title: string;
	content: string;
	created_at: string;
	updated_at: string;
	deleted_at: string;
}

interface dataType {
	articleList: articleList[];
	total_page_count: number;
	current_page_count: number;
}

function PaginationButton({ setData, idx, text }: IProps) {
	const handleButtonClick = () => {
		setData((prev) => ({ ...prev, currentPage: idx }));
	};
	return <button onClick={handleButtonClick}>{text}</button>;
}

export default PaginationButton;
