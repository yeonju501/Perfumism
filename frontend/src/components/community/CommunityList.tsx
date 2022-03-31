import { CommunityListItem } from "components/community";
import styled from "styled-components";

interface ArticleProps {
	articleData: {
		articleList: {
			article_id: number;
			member_id: number;
			member_name: string;
			subject: string;
			title: string;
			content: string;
			createAt: string;
			updateAt: string;
			deleteAt: string;
		}[];
		total_page_count: number;
		current_page_count: number;
	}[];
}

function CommunityList({ articleData }: ArticleProps) {
	return (
		<Container>
			<table>
				<tr>
					<th>번호</th>
					<th>말머리</th>
					<th>제목</th>
					<th>작성자</th>
					<th>작성일</th>
				</tr>
				{articleData.map((articleItem, idx) => (
					<CommunityListItem articleItem={articleItem} key={idx} />
				))}
			</table>
		</Container>
	);
}

const Container = styled.div`
	font-size: 2rem;
	width: 100%;
`;

export default CommunityList;
