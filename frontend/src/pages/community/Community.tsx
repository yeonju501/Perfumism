import { useEffect, useState } from "react";
import { MainHeader, CommunityList } from "components/community";
import Pagination from "components/Pagination";
import communityApi from "apis/community";
import styled from "styled-components";
import { Article } from "types/article";

interface ArticleDataType {
	articleList?: Article[];
	total_page_count: number;
	current_page_count: number;
}

function Community() {
	const [articleDataList, setArticleDataList] = useState<ArticleDataType>({
		articleList: [],
		total_page_count: 0,
		current_page_count: 0,
	});
	const { articleList, total_page_count, current_page_count } = articleDataList;
	const [subject, setSubject] = useState("ALL");

	useEffect(() => {
		getArticleDataList();
	}, [current_page_count]);

	useEffect(() => {
		getArticleDataList(0);
	}, [subject]);

	const getArticleDataList = async (resetCnt?: number) => {
		if (subject === "ALL") {
			try {
				const res = await communityApi.getCommunityList(current_page_count);
				setArticleDataList(res.data);
			} catch (error) {
				console.log(error);
			}
		} else {
			try {
				if (resetCnt === 0) {
					const res = await communityApi.getSubjectCommunityList(resetCnt, subject);
					setArticleDataList(res.data);
				} else {
					const res = await communityApi.getSubjectCommunityList(current_page_count, subject);
					setArticleDataList(res.data);
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<Container>
			<MainHeader setSubject={setSubject} />
			<CommunityList articleList={articleList} />
			{articleDataList.articleList?.length ? (
				<Pagination
					page={current_page_count}
					total={total_page_count}
					setData={setArticleDataList}
				/>
			) : (
				<Content>작성된 게시글이 없습니다.</Content>
			)}
		</Container>
	);
}

const Container = styled.div`
	width: 70%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
`;

const Content = styled.div`
	width: 100%;
	font-size: 3rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 25%;
`;

export default Community;
