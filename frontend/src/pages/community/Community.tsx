import { MainHeader, CommunityList, Pagination } from "components/community";
import styled from "styled-components";

function Community() {
	const articleData = [
		{
			articleList: [
				{
					article_id: 3,
					member_id: 1,
					member_name: "우사앙주운",
					subject: "TALK",
					title: "제목입니다",
					content: "내용입니다",
					createAt: "2022-3-13 14:59:51",
					updateAt: "2023-4-14 14:59:51",
					deleteAt: "2023-4-15 14:59:51",
				},
			],
			total_page_count: 2,
			current_page_count: 1,
		},
		{
			articleList: [
				{
					article_id: 2,
					member_id: 1,
					member_name: "우사앙주운",
					subject: "TALK",
					title: "제목입니다",
					content: "내용입니다",
					createAt: "2022-3-13 14:59:51",
					updateAt: "2023-4-14 14:59:51",
					deleteAt: "2023-4-15 14:59:51",
				},
			],
			total_page_count: 4,
			current_page_count: 1,
		},
		{
			articleList: [
				{
					article_id: 1,
					member_id: 1,
					member_name: "우사앙주운",
					subject: "TALK",
					title: "제목입니다",
					content: "내용입니다",
					createAt: "2022-3-13 14:59:51",
					updateAt: "2023-4-14 14:59:51",
					deleteAt: "2023-4-15 14:59:51",
				},
			],
			total_page_count: 1,
			current_page_count: 1,
		},
	];

	return (
		<Container>
			<MainHeader />
			<CommunityList articleData={articleData} />
			<Pagination />
		</Container>
	);
}

const Container = styled.div`
	height: 80vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 50rem;
`;

export default Community;
