import { useEffect, useRef, useState } from "react";
import { MainHeader, CommunityList, Pagination } from "components/community";
import communityApi from "apis/community";
import styled from "styled-components";

function Community() {
	const [articleData, setArticleData] = useState({
		articleList: [],
		total_page_count: 0,
		current_page_count: 0,
	});
	const { articleList, total_page_count, current_page_count } = articleData;

	useEffect(() => {
		getArticleData();
	}, [current_page_count]);

	const getArticleData = async () => {
		try {
			const res = await communityApi.getCommunityList(current_page_count);
			setArticleData(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<MainHeader />
			<CommunityList articleList={articleList} />
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
