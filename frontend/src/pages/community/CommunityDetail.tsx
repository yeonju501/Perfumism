import { DetailHeader, DetailContent, DetailComment } from "components/community";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

interface CustomizedState {
	articleId: string;
}

function CommunityDetaul() {
	const { articleId } = useLocation().state as CustomizedState;

	const articleData = {
		article_id: 1,
		member_id: 1,
		member_name: "우사앙주운",
		member_image: "잘생김.jpg",
		subject: "TALK",
		title: "제목입니다",
		content: "내용이네요",
		createAt: "2022-3-13 14:59:51",
		updateAt: "2023-4-14 14:59:51",
		deleteAt: "2023-4-15 14:59:51",
		vote_exist: false,
		image_url_list: [
			{
				article_image_id: 1,
				createdAt: "2022-03-31T14:20:01.271Z",
				deletedAt: "2022-03-31T14:20:01.271Z",
				updatedAt: "2022-03-31T14:20:01.271Z",
				image_url:
					"https://perfumism-bucket.s3.ap-northeast-2.amazonaws.com/article/2c5d46e8-e91b-4e56-a3cc-7e0e1dd6a0c5gitlabrunner.png",
			},
		],
	};

	return (
		<Container>
			<DetailHeader />
			<DetailContent />
			<DetailComment />
		</Container>
	);
}

const Container = styled.div`
	height: 80vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 30%;
`;

export default CommunityDetaul;
