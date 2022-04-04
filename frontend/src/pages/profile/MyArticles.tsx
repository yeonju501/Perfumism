import { profileApi } from "apis";
import Pagination from "components/Pagination";
import { Link } from "react-router-dom";
import styled from "styled-components";
import usePagination from "./hooks/usePagination";

function MyArticles() {
	const { articleList, currentPage, totalPage, setData } = usePagination({
		requestApi: (currentPage: number) => {
			return profileApi.getMyArticles(currentPage);
		},
	});
	return (
		<>
			{articleList && (
				<div>
					{articleList.length > 0 ? (
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
									{articleList.map((article, idx) => (
										<Tr key={idx}>
											<Td>{article.subject}</Td>
											<Td>
												<Link to="">{article.title}</Link>
											</Td>
											<Td>{article.created_at.slice(0, 10)}</Td>
										</Tr>
									))}
								</tbody>
							</Table>
							{articleList.length > 0 && (
								<Footer>
									<Pagination page={currentPage} total={totalPage} setData={setData} />
								</Footer>
							)}
						</>
					) : (
						<p>작성한 글이 없습니다</p>
					)}
				</div>
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
