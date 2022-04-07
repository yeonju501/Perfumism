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
				<Container>
					{commentList.length > 0 ? (
						<>
							<Table>
								<thead>
									<tr>
										<Th width={"60%"}>내용</Th>
										<Th width={"40%"}>작성 날짜</Th>
									</tr>
								</thead>
								<tbody>
									{commentList.map((comment, idx) => (
										<Tr key={idx}>
											<Td>
												<Link to={`/community/${comment.article_id}`}>
													{comment.content.length > 20
														? `${comment.content.slice(0, 20)}...`
														: comment.content}
												</Link>
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
						<p id="default">작성한 댓글이 없습니다</p>
					)}
				</Container>
			)}
		</>
	);
}

const Container = styled.div`
	width: 100%;
	#default {
		font-size: 3rem;
		margin-top: 35vh;
		text-align: center;
	}
`;

const Table = styled.table`
	margin: 6rem auto;
	width: 80%;
`;

interface WidthProps {
	width: string;
}

const Th = styled.th<WidthProps>`
	border-bottom: 1px solid #e8e8e8;
	padding-bottom: 1rem;
	font-size: 2.2rem;
	width: ${({ width }) => width};
	@media ${(props) => props.theme.mobileS} {
		font-size: 1.8rem;
	}
`;

const Tr = styled.tr`
	text-align: center;
	font-size: 1.6rem;
	@media ${(props) => props.theme.mobileS} {
		font-size: 1.4rem;
	}
`;

const Td = styled.td`
	padding: 0.7rem;
`;

const Footer = styled.footer`
	text-align: center;
`;

export default MyComments;
