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
					<Tr>
						<Filter>말머리</Filter>
						<Title>제목</Title>
						<Writer>작성자</Writer>
						<Date>작성일</Date>
					</Tr>
					{articleList ? (
						articleList.map((articleItem, idx) => (
							<CommunityListItem articleItem={articleItem} key={idx} />
						))
					) : (
						<Th>작성한 글이 없습니다.</Th>
					)}
				</Thead>
			</Table>
		</Container>
	);
}

const Container = styled.div`
	font-size: 1.5rem;
	width: 100%;
	@media ${(props) => props.theme.mobileXS} {
		width: auto;
	}
	@media ${(props) => props.theme.mobileS} {
		font-size: 1.2rem;
	}
`;

const Table = styled.table`
	text-align: center;
	width: 100%;
	@media ${(props) => props.theme.mobileXS} {
		width: 90vw;
	}
`;

const Thead = styled.thead``;

const Tr = styled.tr``;

const Th = styled.th`
	border-bottom: 1px solid #e8e8e8;
	font-size: 2rem;
	padding: 10px 5px;
	font-weight: bold;
	width: auto;
	@media ${(props) => props.theme.mobileS} {
		font-size: 1.5rem;
	}
`;

const Filter = styled(Th)`
	width: 20%;
`;
const Title = styled(Th)``;
const Writer = styled(Th)`
	width: 20%;
`;
const Date = styled(Th)`
	width: 15%;
	@media ${(props) => props.theme.mobile} {
		display: none;
	}
`;

export default CommunityList;
