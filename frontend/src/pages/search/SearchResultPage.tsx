import { searchApi } from "apis";
import PerfumeList from "components/perfume/PerfumeList";
import Spinner from "components/Spinner";
import useInfiniteScroll from "pages/perfume/hooks/useInfiniteScroll";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

interface StateProps {
	keyword: string;
	results: [];
}

function SearchResultPage() {
	const location = useLocation();
	const state = location.state as StateProps;

	const { setTarget, perfumes, isLoading } = useInfiniteScroll({
		requestApi: (currentPage) => {
			return searchApi.searchPerfume(state.keyword, currentPage);
		},
	});

	return (
		<Page>
			{perfumes.length > 2 ? (
				<PerfumeList perfumes={perfumes} />
			) : (
				<NoResult>입력하신 {state.keyword}에 대한 결과가 없습니다.</NoResult>
			)}
			<div ref={setTarget}>{isLoading && <Spinner />}</div>
		</Page>
	);
}

export default SearchResultPage;

const Page = styled.main`
	height: 100%;
	/* overflow-y: scroll; */
`;

const NoResult = styled.h1`
	text-align: center;
	font-size: 3rem;
	margin-top: 5rem;
`;
