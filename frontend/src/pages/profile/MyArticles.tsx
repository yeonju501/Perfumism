import { profileApi } from "apis";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
			<Table>
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
							<Tr key={idx}>
								<Td>{article.subject}</Td>
								<Td>
									<Link to="">{article.title}</Link>
								</Td>
								<Td>{article.created_at.slice(0, 10)}</Td>
							</Tr>
						))
					) : (
						<tr>
							<td>아직 작성한 글이 없습니다</td>
						</tr>
					)}
				</tbody>
			</Table>
			{articleList.length > 0 && (
				<Footer>
					<Pagination page={currentPage} total={totalPage} setData={setData} />
				</Footer>
			)}
		</>
	);
}

const Table = styled.table`
	margin: 5rem auto;
	width: 80%;
	font-size: 1.8rem;
`;

const Tr = styled.tr`
	text-align: center;
	margin-top: 2rem;
`;

const Td = styled.td``;

const Footer = styled.footer`
	text-align: center;
`;
export default MyArticles;
