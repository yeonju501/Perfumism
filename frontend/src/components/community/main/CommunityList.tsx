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

interface WidthProps {
	width: string;
}

function CommunityList({ articleList }: ArticleProps) {
	return (
		<Container>
			<Table>
				<Thead>
					<Tr>
						<Th width={"10%"}>번호</Th>
						<Th width={"25%"}>말머리</Th>
						<Th width={"30%"}>제목</Th>
						<Th width={"15%"}>작성자</Th>
						<Th width={"20%"}>작성일</Th>
					</Tr>
					{articleList ? (
						articleList.map((articleItem, idx) => (
							<CommunityListItem articleItem={articleItem} key={idx} />
						))
					) : (
						<Th width={"100%"}>작성한 글이 없습니다.</Th>
					)}
				</Thead>
			</Table>
		</Container>
	);
}

const Container = styled.div`
	font-size: 2rem;
	width: 100%;
`;

const Table = styled.table`
	width: 100%;
	table-layoutL fixed;
	text-align: center;
`;

const Thead = styled.thead``;

const Tr = styled.tr``;

const Th = styled.th<WidthProps>`
	border-bottom: 1px solid #e8e8e8;
	font-size: 2rem;
	padding: 10px 5px;
	font-weight: bold;
	width: ${({ width }) => width};
`;

export default CommunityList;
