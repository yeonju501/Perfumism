import PaginationButton from "./button/PaginationButton";

interface PaginationProps {
	total: number;
	page: number;
	setData: React.Dispatch<React.SetStateAction<DataType>>;
}

interface DataType {
	articleList?: ArticleListType[];
	commentList?: CommentListType[];
	total_page_count: number;
	current_page_count: number;
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

interface CommentListType {
	comment_id: number;
	content: string;
	created_at: string;
}

function Pagination({ total, page, setData }: PaginationProps) {
	return (
		<>
			<nav>
				<button
					onClick={() => setData((prev) => ({ ...prev, current_page_count: page - 1 }))}
					disabled={page === 0}
				>
					&lt;
				</button>
				{Array(total)
					.fill("")
					.map((_, i) => (
						<PaginationButton key={i + 1} setData={setData} idx={i} text={String(i + 1)} />
					))}
				<button
					onClick={() => setData((prev) => ({ ...prev, current_page_count: page + 1 }))}
					disabled={page === total - 1}
				>
					&gt;
				</button>
			</nav>
		</>
	);
}

export default Pagination;
