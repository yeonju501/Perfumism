import { useEffect, useState } from "react";
import { DetailHeader, DetailContent, DetailComment } from "components/community";
import { useLocation } from "react-router-dom";
import communityApi from "apis/community";
import styled from "styled-components";

interface CustomizedState {
	articleId: number;
}

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

function CommunityDetaul() {
	const { articleId } = useLocation().state as CustomizedState;
	const [articleData, setArticleData] = useState<ArticleDataType>({
		article_id: 0,
		member_id: 0,
		member_name: "",
		member_image: "",
		subject: "",
		title: "",
		content: "",
		createAt: "",
		updateAt: "",
		deleteAt: "",
		vote_exist: false,
		image_url_list: [
			{
				article_image_id: 0,
				createdAt: "",
				deletedAt: "",
				updatedAt: "",
				image_url: "",
			},
		],
	});

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
		<Container>
			<DetailHeader />
			<DetailContent articleData={articleData} />
			<DetailComment />
		</Container>
	);
}

const Container = styled.div`
	min-height: 80vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 30%;
`;

export default CommunityDetaul;
