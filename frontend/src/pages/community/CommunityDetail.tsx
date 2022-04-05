import { useEffect, useState } from "react";
import { DetailHeader, DetailContent, DetailComment } from "components/community";
import { useParams } from "react-router-dom";
import communityApi from "apis/community";
import styled from "styled-components";

interface ArticleDataType {
	article_id: number;
	member_id: number;
	member_name: string;
	member_image: string;
	subject: string;
	title: string;
	content: string;
	createAt: string;
	updateAt: string;
	deleteAt: string;
	vote_exist: boolean;
	image_url_list: {
		article_image_id: number;
		createdAt: string;
		deletedAt: string;
		updatedAt: string;
		image_url: string;
	}[];
}

function CommunityDetail() {
	const articleId = useParams().articleId;
	const [articleData, setArticleData] = useState<ArticleDataType>();

	useEffect(() => {
		getArticleData();
	}, []);

	const getArticleData = async () => {
		try {
			const res = await communityApi.getCommunityDetail(articleId);
			setArticleData(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{articleData && (
				<Container>
					<DetailHeader articleData={articleData} />
					<DetailContent articleData={articleData} />
					<DetailComment articleId={articleData.article_id} />
				</Container>
			)}
		</>
	);
}

const Container = styled.div`
	min-height: 80vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 30%;
`;

export default CommunityDetail;
