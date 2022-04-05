import { CommunityListItem } from "components/community";
import styled from "styled-components";

interface ArticleProps {
	articleList?: {
		article_id: number;
		member_id: number;
		member_name: string;
		subject: string;
		title: string;
		content: string;
		created_at: string;
		updated_at: string | null;
		deleted_at: string | null;
	}[];
}

function CommunityList({ articleList }: ArticleProps) {
	return (
		<Container>
			<Table>
				<Thead>
					<tr>
						<th>번호</th>
						<th>말머리</th>
						<th>제목</th>
						<th>작성자</th>
						<th>작성일</th>
					</tr>
					{articleList ? (
						articleList.map((articleItem, idx) => (
							<CommunityListItem articleItem={articleItem} key={idx} />
						))
					) : (
						<td>작성한 글이 없습니다.</td>
					)}
				</Thead>
			</Table>
		</Container>
	);
}

const Container = styled.div`
	font-size: 2rem;
	width: 100%;
	text-align: center;
`;

const Table = styled.table`
	width: 100%;
	table-layoutL fixed;
`;

const Thead = styled.thead``;

export default CommunityList;
