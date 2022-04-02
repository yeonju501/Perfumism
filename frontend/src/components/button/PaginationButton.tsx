interface IProps {
	setData: React.Dispatch<React.SetStateAction<DataType>>;
	idx: number;
	text: string;
}

interface ArticleListType {
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

interface DataType {
	articleList?: ArticleListType[];
	commentList?: CommentListType[];
	total_page_count: number;
	current_page_count: number;
}

interface CommentListType {
	comment_id: number;
	content: string;
	created_at: string;
}

function PaginationButton({ setData, idx, text }: IProps) {
	const handleButtonClick = () => {
		setData((prev) => ({ ...prev, currentPage: idx }));
	};
	return <button onClick={handleButtonClick}>{text}</button>;
}

export default PaginationButton;
