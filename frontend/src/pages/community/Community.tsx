import { MainHeader, CommunityList, Pagination } from "components/community";
import styled from "styled-components";

function Community() {
	const articleData = {
		articleList: [
			{
				article_id: 2,
				member_id: 12,
				member_name: "asdf",
				subject: "TALK",
				title: "ㅎㅇ",
				content: "ㅂㅇ",
				created_at: "2022-03-31 14:25:42",
				updated_at: null,
				deleted_at: null,
			},
			{
				article_id: 1,
				member_id: 1,
				member_name: "tata",
				subject: "TALK",
				title: "제목입니다",
				content: "내용입니다",
				created_at: "2022-03-31 12:23:09",
				updated_at: null,
				deleted_at: null,
			},
		],
		total_page_count: 1,
		current_page_count: 0,
	};

	return (
		<Container>
			<MainHeader />
			<CommunityList articleList={articleData.articleList} />
			<Pagination />
		</Container>
	);
}

const Container = styled.div`
	height: 80vh;
	width: 50%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 25%;
`;

export default Community;
