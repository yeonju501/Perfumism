import { useEffect, useState } from "react";

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

interface usePaginationProps {
	requestApi: (currentPage: number) => Promise<any>;
}
function usePagination({ requestApi }: usePaginationProps) {
	const [data, setData] = useState<DataType>({
		articleList: [],
		commentList: [],
		total_page_count: 0,
		current_page_count: 0,
	});

	const { articleList, commentList } = data;
	const totalPage = data.total_page_count;
	const currentPage = data.current_page_count;

	console.log(currentPage);

	useEffect(() => {
		getData();
	}, [currentPage]);

	const getData = async () => {
		const res = await requestApi(currentPage);
		setData(res.data);
	};

	return { articleList, commentList, currentPage, totalPage, setData };
}

export default usePagination;
