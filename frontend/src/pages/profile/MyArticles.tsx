import { profileApi } from "apis";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

function MyArticles() {
	const [data, setData] = useState<dataType>({
		articleList: [],
		total_page_count: 0,
		current_page_count: 0,
	});
	const { articleList } = data;
	const totalPage = data.total_page_count;
	const currentPage = data.current_page_count;

	useEffect(() => {
		getData();
	}, [currentPage]);

	const getData = async () => {
		const res = await profileApi.getMyArticles(currentPage);
		setData(res.data);
	};

	return (
		<>
			<table>
				<thead>
					<tr>
						<th>말머리</th>
						<th>제목</th>
						<th>작성 날짜</th>
					</tr>
				</thead>
				<tbody>
					{articleList.length > 0 ? (
						articleList.map((article, idx) => (
							<tr key={idx}>
								<td>{article.subject}</td>
								<td>
									<Link to="">{article.title}</Link>
								</td>
								<td>{article.created_at.slice(0, 10)}</td>
							</tr>
						))
					) : (
						<tr>
							<td>아직 작성한 글이 없습니다</td>
						</tr>
					)}
				</tbody>
			</table>
			{articleList.length > 0 && (
				<footer>
					<Pagination page={currentPage} total={totalPage} setData={setData} />
				</footer>
			)}
		</>
	);
}

export default MyArticles;
