import { useEffect, useState } from "react";
import { Article } from "types/article";
import { Comment } from "types/comment";

interface DataType {
	articleList?: Article[];
	commentList?: Comment[];
	total_page_count: number;
	current_page_count: number;
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
