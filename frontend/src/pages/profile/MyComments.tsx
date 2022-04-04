import { profileApi } from "apis";
import Pagination from "components/Pagination";
import { Link } from "react-router-dom";
import styled from "styled-components";
import usePagination from "./hooks/usePagination";

function MyComments() {
	const { commentList, currentPage, totalPage, setData } = usePagination({
		requestApi: (currentPage: number) => {
			return profileApi.getMyComments(currentPage);
		},
	});

	return (
		<>
			{commentList && (
				<>
					{commentList.length > 0 ? (
						<>
							<Table>
								<thead>
									<tr>
										<th>번호</th>
										<th>내용</th>
										<th>작성 날짜</th>
									</tr>
								</thead>
								<tbody>
									{commentList.map((comment, idx) => (
										<Tr key={idx}>
											<Td>{idx}</Td>
											<Td>
												<Link to="">{comment.content}</Link>
											</Td>
											<Td>{comment.created_at.slice(0, 10)}</Td>
										</Tr>
									))}
								</tbody>
							</Table>
							{commentList.length > 0 && (
								<Footer>
									<Pagination page={currentPage} total={totalPage} setData={setData} />
								</Footer>
							)}
						</>
					) : (
						<p>작성한 댓글이 없습니다</p>
					)}
				</>
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

export default MyComments;
